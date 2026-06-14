# BeeCee Medical Laboratory

A modern, secure medical laboratory services web application built with Next.js 14, TypeScript, and Tailwind CSS.

## Security Features

This application implements enterprise-grade security measures:

- **Rate Limiting**: 10 requests/hour per IP
- **Input Sanitization**: XSS and injection prevention
- **hCaptcha Integration**: Bot protection
- **CORS Protection**: Origin validation
- **Security Headers**: CSP, HSTS, X-Frame-Options, etc.
- **Environment Variables**: Secure credential management
- **Error Handling**: No sensitive data exposure

See [SECURITY.md](./SECURITY.md) for detailed security documentation.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd beecee-labs
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your credentials:
   - `ZEPTOMAIL_API_KEY`: Your ZeptoMail API key
   - `HCAPTCHA_SECRET_KEY`: Your hCaptcha secret key

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** HugeIcons React
- **Email:** ZeptoMail API
- **Security:** hCaptcha, validator.js
- **Linting:** ESLint

## Project Structure

```
beecee-labs/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── send-email/
│   │   │       └── route.ts       # Secure email API endpoint
│   │   ├── layout.tsx             # Root layout with hCaptcha
│   │   ├── page.tsx               # Home page
│   │   └── globals.css            # Global styles
│   └── components/                # Reusable components
├── public/
│   ├── images/                    # Static images
│   ├── robots.txt                 # SEO configuration
│   └── .well-known/
│       └── security.txt           # Security policy
├── .env.example                   # Environment variables template
├── .env.local                     # Local environment (gitignored)
├── next.config.js                 # Next.js config with security headers
├── SECURITY.md                    # Security documentation
├── DEPLOYMENT.md                  # Deployment guide
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions.

**Quick Deploy:**

- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`

**Important**: Before deploying to production:

1. Rotate all API keys
2. Set environment variables in hosting platform
3. Update `ALLOWED_ORIGINS` in API route
4. Run security audit: `npm audit`

## Environment Variables

Required variables (add to `.env.local`):

```bash
ZEPTOMAIL_API_KEY=your_zeptomail_api_key
HCAPTCHA_SECRET_KEY=your_hcaptcha_secret_key
```

**Never commit `.env.local` to version control!**

## Testing

### Manual Testing

1. Test contact form submission
2. Verify hCaptcha requirement
3. Test rate limiting (11+ requests in 1 hour)
4. Check email delivery (admin + auto-response)

### Security Testing

```bash
# Check for vulnerabilities
npm audit

# Test security headers
curl -I https://yourdomain.com
```

## Responsive Design

- Mobile (320px+)
- Tablet (768px+)
- iPad (1024px+) - Fixed navbar responsiveness
- Desktop (1280px+)

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Support

- **Email**: beeceelaboratory@gmail.com
- **Phone**: +234 810 291 8085
- **Address**: Claret Plaza, 1 De-Paul Close, Yakoyo Bus-stop, Berger, Nigeria

## Links

- [Website](https://beeceemedicallaboratory.com)
- [Security Policy](./SECURITY.md)
- [Deployment Guide](./DEPLOYMENT.md)

## Security

For security vulnerabilities, please email beeceelaboratory@gmail.com instead of using the issue tracker.
