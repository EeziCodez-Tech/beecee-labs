import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per hour per IP

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://beeceemedicallaboratory.com',
  'https://www.beeceemedicallaboratory.com',
];

// Simple HTML sanitization function
function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Rate limiting function
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count };
}

// Verify hCaptcha token
async function verifyHCaptcha(token: string, remoteip: string): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET_KEY;
  
  if (!secret) {
    console.error('HCAPTCHA_SECRET_KEY is not configured');
    return false;
  }

  try {
    const response = await fetch('https://api.hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip,
        sitekey: '0a24afb8-d294-4d62-a296-8124449c376c',
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('hCaptcha verification error:', error);
    return false;
  }
}

const getRequestTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    'schedule-appointment': 'Schedule Lab Appointment',
    'partnership-inquiry': 'Partnership Inquiry',
    'general-inquiry': 'General Inquiry',
    'test-results': 'Test Results Follow-up',
    'corporate-wellness': 'Corporate Wellness Program',
    'home-service': 'Home Collection Service',
  };
  return labels[type] || type;
};

export async function POST(request: NextRequest) {
  try {
    // Origin validation
    const origin = request.headers.get('origin');
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'Retry-After': '3600',
          }
        }
      );
    }

    const body = await request.json();
    const { name, email, phone, message, requestType, hcaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !phone || !message || !requestType || !hcaptchaToken) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify hCaptcha
    const captchaValid = await verifyHCaptcha(hcaptchaToken, ip);
    if (!captchaValid) {
      return NextResponse.json(
        { error: 'Captcha verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Input validation
    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (!validator.isMobilePhone(phone, 'any')) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    if (name.length > 100 || message.length > 2000) {
      return NextResponse.json(
        { error: 'Input too long' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeHtml(validator.escape(name.trim()));
    const sanitizedEmail = validator.normalizeEmail(email.trim()) || email.trim();
    const sanitizedPhone = validator.escape(phone.trim());
    const sanitizedMessage = sanitizeHtml(validator.escape(message.trim()));

    const zeptoMailApiKey = process.env.ZEPTOMAIL_API_KEY;
    
    if (!zeptoMailApiKey) {
      console.error('ZEPTOMAIL_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const emailPayload = {
      from: { address: 'noreply@beeceemedicallaboratory.com' },
      to: [
        {
          email_address: {
            address: 'beeceelaboratory@gmail.com',
            name: 'BeeCee Medical Laboratory',
          },
        },
      ],
      subject: 'New Lab Visit Request - Action Required',
      htmlbody: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Lab Visit Request</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);">
                  
                  <!-- Header with Logo and Gradient -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #0048AF 0%, #0066FF 100%); padding: 40px 40px 30px; text-align: center;">
                      <img src="https://beeceemedicallaboratory.com/images/beecee-footer.png" alt="BeeCee Medical Laboratory" style="max-width: 180px; height: auto; margin-bottom: 20px;" />
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">New Lab Visit Request</h1>
                      <p style="margin: 12px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 15px; font-weight: 400;">A new appointment request has been submitted  <br/> Kindly respond within 24 hours</p>
                    </td>
                  </tr>

                  <!-- Patient Information Card -->
                  <tr>
                    <td style="padding: 40px;">
                      <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; padding: 28px; margin-bottom: 24px; border: 1px solid #dee2e6;">
                        <h2 style="margin: 0 0 20px; color: #0048AF; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #0048AF; padding-bottom: 12px;">Patient Details</h2>
                        
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">
                              <table role="presentation" style="width: 100%;">
                                <tr>
                                  <td style="vertical-align: top;">
                                    <p style="margin: 0; color: #6c757d; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Request Type</p>
                                    <p style="margin: 4px 0 0; color: #212529; font-size: 16px; font-weight: 600;">${getRequestTypeLabel(requestType)}</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">
                              <table role="presentation" style="width: 100%;">
                                <tr>
                                  <td style="vertical-align: top;">
                                    <p style="margin: 0; color: #6c757d; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</p>
                                    <p style="margin: 4px 0 0; color: #212529; font-size: 16px; font-weight: 600;">${sanitizedName}</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">
                              <table role="presentation" style="width: 100%;">
                                <tr>
                                  <td style="vertical-align: top;">
                                    <p style="margin: 0; color: #6c757d; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</p>
                                    <p style="margin: 4px 0 0; color: #212529; font-size: 16px; font-weight: 600;"><a href="mailto:${sanitizedEmail}" style="color: #0048AF; text-decoration: none;">${sanitizedEmail}</a></p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          
                          <tr>
                            <td style="padding: 12px 0;">
                              <table role="presentation" style="width: 100%;">
                                <tr>
                                  <td style="vertical-align: top;">
                                    <p style="margin: 0; color: #6c757d; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</p>
                                    <p style="margin: 4px 0 0; color: #212529; font-size: 16px; font-weight: 600;"><a href="tel:${sanitizedPhone}" style="color: #0048AF; text-decoration: none;">${sanitizedPhone}</a></p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </div>

                      <!-- Reason for Visit Card -->
                      <div style="background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%); border-radius: 12px; padding: 28px; border-left: 4px solid #0048AF; box-shadow: 0 2px 8px rgba(0, 72, 175, 0.1);">
                        <h2 style="margin: 0 0 16px; color: #0048AF; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center;">
                          Reason for Visit
                        </h2>
                        <div style="background: #ffffff; border-radius: 8px; padding: 20px; border: 1px solid #dee2e6;">
                          <p style="margin: 0; color: #212529; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${sanitizedMessage}</p>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <!-- Action Buttons -->
                  <tr>
                    <td style="padding: 0 40px 40px;">
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding-right: 8px;">
                            <a href="mailto:${sanitizedEmail}" style="display: block; background: linear-gradient(135deg, #0048AF 0%, #0066FF 100%); color: #ffffff; text-decoration: none; padding: 16px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; text-align: center; box-shadow: 0 4px 12px rgba(0, 72, 175, 0.3);">
                              📧 Reply to Patient
                            </a>
                          </td>
                          <td style="padding-left: 8px;">
                            <a href="tel:${sanitizedPhone}" style="display: block; background: #ffffff; color: #0048AF; text-decoration: none; padding: 16px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; text-align: center; border: 2px solid #0048AF;">
                              📞 Call Patient
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background: #f8f9fa; padding: 30px 40px; border-top: 1px solid #dee2e6;">
                      <table role="presentation" style="width: 100%;">
                        <tr>
                          <td style="text-align: center;">
                            <p style="margin: 0 0 12px; color: #6c757d; font-size: 13px; line-height: 1.6;">
                              This request was submitted through the BeeCee Medical Laboratory website<br/>
                              <strong>Submitted on:</strong> ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
                            </p>
                            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #dee2e6;">
                              <p style="margin: 0; color: #adb5bd; font-size: 12px;">
                                © ${new Date().getFullYear()} BeeCee Medical Laboratory Services. All rights reserved.
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // Send admin notification email
    const response = await fetch('https://api.zeptomail.com/v1.1/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Zoho-enczapikey ${zeptoMailApiKey}`,
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('ZeptoMail API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send auto-response email to user
    const autoResponsePayload = {
      from: { address: 'noreply@beeceemedicallaboratory.com' },
      to: [
        {
          email_address: {
            address: sanitizedEmail,
            name: sanitizedName,
          },
        },
      ],
      subject: 'Request Received - BeeCee Medical Laboratory',
      htmlbody: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Request Confirmation</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #0048AF 0%, #0066FF 100%); padding: 40px; text-align: center;">
                      <img src="https://beeceemedicallaboratory.com/images/beecee-footer.png" alt="BeeCee Medical Laboratory" style="max-width: 180px; height: auto; margin-bottom: 20px;" />
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Request Received!</h1>
                      <p style="margin: 12px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 15px;">We've got your message, ${sanitizedName.split(' ')[0]}</p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="margin: 0 0 20px; color: #212529; font-size: 16px; line-height: 1.6;">
                        Thank you for reaching out to BeeCee Medical Laboratory! We have successfully received your request regarding <strong>${sanitizeHtml(getRequestTypeLabel(requestType))}</strong>.
                      </p>
                      
                      <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #0048AF;">
                        <h2 style="margin: 0 0 16px; color: #0048AF; font-size: 18px; font-weight: 700;">What Happens Next?</h2>
                        <ul style="margin: 0; padding-left: 20px; color: #212529; line-height: 1.8;">
                          <li>Our team will review your request within <strong>24 hours</strong></li>
                          <li>You'll receive a call or email to confirm details</li>
                          <li>We'll schedule your appointment at a convenient time</li>
                          <li>You'll receive a confirmation with all the details</li>
                        </ul>
                      </div>

                      <div style="background: #fff; border: 2px solid #dee2e6; border-radius: 12px; padding: 20px; margin: 24px 0;">
                        <h3 style="margin: 0 0 12px; color: #212529; font-size: 16px; font-weight: 600;">Your Request Summary</h3>
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td style="padding: 8px 0; color: #6c757d; font-size: 14px;">Request Type:</td>
                            <td style="padding: 8px 0; color: #212529; font-size: 14px; font-weight: 600; text-align: right;">${sanitizeHtml(getRequestTypeLabel(requestType))}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #6c757d; font-size: 14px; border-top: 1px solid #dee2e6;">Contact Email:</td>
                            <td style="padding: 8px 0; color: #212529; font-size: 14px; font-weight: 600; text-align: right; border-top: 1px solid #dee2e6;">${sanitizedEmail}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #6c757d; font-size: 14px; border-top: 1px solid #dee2e6;">Contact Phone:</td>
                            <td style="padding: 8px 0; color: #212529; font-size: 14px; font-weight: 600; text-align: right; border-top: 1px solid #dee2e6;">${sanitizedPhone}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #6c757d; font-size: 14px; border-top: 1px solid #dee2e6;">Submitted:</td>
                            <td style="padding: 8px 0; color: #212529; font-size: 14px; font-weight: 600; text-align: right; border-top: 1px solid #dee2e6;">${new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                          </tr>
                        </table>
                      </div>

                      <div style="background: linear-gradient(135deg, #FFF3CD 0%, #FFF8E1 100%); border-left: 4px solid #FFB800; border-radius: 8px; padding: 16px; margin: 24px 0;">
                        <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                          <strong>Quick Tip:</strong> Please ensure your phone is reachable so our team can contact you promptly.
                        </p>
                      </div>

                      <p style="margin: 24px 0 0; color: #6c757d; font-size: 14px; line-height: 1.6;">
                        If you have any urgent questions, feel free to call us directly at <strong style="color: #0048AF;">+234 802 3584 869</strong>  Please do not reply directly to this email address
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #dee2e6;">
                      <p style="margin: 0 0 12px; color: #212529; font-size: 16px; font-weight: 600;">
                        BeeCee Medical Laboratory
                      </p>
                      <p style="margin: 0 0 16px; color: #6c757d; font-size: 14px;">
                        Your Health, Our Priority
                      </p>
                      <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #dee2e6;">
                        <p style="margin: 0; color: #adb5bd; font-size: 12px;">
                          © ${new Date().getFullYear()} BeeCee Medical Laboratory Services. All rights reserved.
                        </p>
                      </div>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    const autoResponse = await fetch('https://api.zeptomail.com/v1.1/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Zoho-enczapikey ${zeptoMailApiKey}`,
      },
      body: JSON.stringify(autoResponsePayload),
    });

    if (!autoResponse.ok) {
      console.error('Failed to send auto-response email');
    }

    const result = await response.json();
    return NextResponse.json(
      { success: true, data: result },
      {
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        }
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Preflight CORS handler
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }
  
  return new NextResponse(null, { status: 403 });
}
