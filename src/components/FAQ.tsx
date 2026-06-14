'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Add01Icon, Remove01Icon } from 'hugeicons-react';

const faqs = [
  {
    question: 'How quickly can I get my test results?',
    answer: 'Standard tests are typically processed within 24-48 hours. Urgent cases can receive same-day results. You\'ll be notified via SMS and email when your results are ready, and can access them securely through our patient portal.',
  },
  {
    question: 'Do I need a doctor\'s referral for testing?',
    answer: 'While many tests can be performed without a referral, certain specialized diagnostics may require physician authorization. Our team can guide you on specific requirements when you book your appointment.',
  },
  {
    question: 'Are your laboratory facilities accredited?',
    answer: 'Yes, we maintain full accreditation from national and international regulatory bodies. Our facilities undergo regular audits and quality assessments to ensure compliance with the highest medical laboratory standards.',
  },
  {
    question: 'How do you ensure patient data privacy?',
    answer: 'We take your privacy seriously. Contact information submitted through our appointment request form is handled with strict confidentiality and used solely for scheduling purposes. We do not store sensitive medical data online.',
  },
  {
    question: 'Do you offer corporate health screening packages?',
    answer: 'Absolutely. We provide customized corporate packages including pre-employment screenings, annual health checks, and onsite testing services. Contact our corporate partnerships team for tailored solutions.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto mb-section-gap">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
          Frequently Asked Questions
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Everything you need to know about our services
        </p>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/20 hover:border-primary/30 transition-colors"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex justify-between items-center text-left group"
              aria-expanded={openIndex === index}
            >
              <span className="font-headline-md text-lg text-on-surface font-bold pr-4 group-hover:text-primary transition-colors">
                {faq.question}
              </span>
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all">
                {openIndex === index ? (
                  <Remove01Icon size={20} />
                ) : (
                  <Add01Icon size={20} />
                )}
              </div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 pt-0">
                    <p className="font-body-md text-on-surface-variant leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
