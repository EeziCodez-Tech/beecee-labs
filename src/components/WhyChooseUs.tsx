'use client';

import { motion } from 'framer-motion';
import { Certificate02Icon, SecurityCheckIcon, Time02Icon, UserMultiple02Icon } from 'hugeicons-react';

const features = [
  {
    icon: Certificate02Icon,
    title: 'Accredited Excellence',
    description: 'Fully accredited by national and international health regulatory bodies, ensuring the highest standards.',
  },
  {
    icon: Time02Icon,
    title: 'Rapid Turnaround',
    description: 'Industry-leading processing times with same-day results available for urgent cases.',
  },
  {
    icon: SecurityCheckIcon,
    title: 'Data Security',
    description: 'HIPAA-compliant systems with end-to-end encryption protecting your sensitive health information.',
  },
  {
    icon: UserMultiple02Icon,
    title: 'Expert Team',
    description: 'Board-certified pathologists and laboratory scientists with decades of combined experience.',
  },
];

export default function WhyChooseUs() {
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
          Why Healthcare Professionals Choose Us
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Combining cutting-edge technology with human expertise for unparalleled diagnostic accuracy
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface-container-lowest rounded-2xl p-8 card-lift group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={28} className="text-primary" />
                </div>

                <h3 className="font-headline-md text-xl text-on-surface mb-3 font-bold">
                  {feature.title}
                </h3>

                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Accreditation Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 pt-12 border-t border-outline-variant/20"
      >
        <p className="text-center text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-8">
          Accredited &amp; Certified By
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
          {['ISO 15189', 'MLSCN Certified', 'HIPAA Compliant', 'NHIS Approved'].map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-2.5 bg-surface-container-lowest border border-outline-variant/20 rounded-full px-5 py-3 shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <Certificate02Icon size={18} className="text-primary" />
              <span className="font-semibold text-sm text-on-surface">{cert}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
