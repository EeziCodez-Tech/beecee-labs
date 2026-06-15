'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft01Icon, ArrowRight01Icon } from 'hugeicons-react';

const testimonials = [
  {
    name: 'Fr. Justin Ifeanyi',
    role: 'Client',
    content: 'I had an excellent experience at BeeCee Medical Laboratory services. The staff were highly professional, courteous, and attentive throughout the entire process. From registration to sample collection, everything was handled efficiently and with great care.',
  },
  {
    name: 'Adeyinka Tosin',
    role: 'Client',
    content: 'The Laboratory environment was clean, organized, and maintained high standards of hygiene, which gave me confidence in the quality of service provided. The medical personnel explained procedures clearly and ensured I was comfortable during my visit.',
  },
  {
    name: 'Mrs Bola Ayodele',
    role: 'Client',
    content: 'What impressed me most about BeeCee Medical Laboratory Services was the timely delivery of accurate test results and the commitment to patient care. I truly appreciate their dedication to excellence and would confidently recommend this laboratory centre to anyone seeking reliable and professional diagnostic services.',
  },
  {
    name: 'Daniella',
    role: 'Client',
    content: 'The laboratory is very neat and maintains a high standard of hygiene and sanitation, which I\'ve been most impressed by. They deliver accurate results in a timely manner. I appreciate their attentiveness and dedication to patient care and would recommend this laboratory to anyone.',
  },
  {
    name: 'Mrs Stella Olalekan',
    role: 'Employer',
    content: 'I recently brought my staff to BeeCee Medical Laboratory Services for Food Handlers, drivers and Nanny screening tests. I was highly impressed by the exceptional service we received. The laboratory environment was clean, organized, and maintained high standards of hygiene. I wholeheartedly recommend BeeCee Medical Laboratory Services to individuals and organizations seeking dependable diagnostic and employment screening services.',
  },
  {
    name: 'Mls Alao Hakeem',
    role: 'Medical Laboratory Scientist',
    content: 'BeeCee Medical Laboratory services is owned by a professional and licensed medical laboratory scientist who has gathered wealth of experience from manual practice to full Automation. The owner is a lover of accurate, precise and timely service. She believes in quality healthcare services. As a colleague, I respect the laboratory judgment and I strongly recommend BeeCee Medical Laboratory for all your laboratory requests.',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto mb-section-gap">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
          Trusted by Healthcare Professionals
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Hear from our partners who rely on our diagnostic excellence
        </p>
      </motion.div>

      <div className="relative">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="bg-surface-container-lowest rounded-3xl p-4 md:p-8 relative overflow-hidden shadow-lg"
        >
          <div className="absolute top-8 right-8 opacity-5 text-primary text-[120px] font-serif">
            &ldquo;
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <p className="font-body-lg text-lg md:text-xl text-on-surface mb-8 leading-relaxed italic">
              &ldquo;{testimonials[currentIndex].content}&rdquo;
            </p>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-headline-md text-2xl text-primary font-bold">
                  {testimonials[currentIndex].name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-headline-md text-xl text-on-surface font-bold">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="font-body-md text-sm text-on-surface-variant">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center group"
            aria-label="Previous testimonial"
          >
            <ArrowLeft01Icon size={20} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-outline-variant'
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-12 h-12 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center group"
            aria-label="Next testimonial"
          >
            <ArrowRight01Icon size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
