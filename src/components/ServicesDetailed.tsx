'use client';

import { motion } from 'framer-motion';
import { Time02Icon, Calendar03Icon, TestTubeIcon, DropletIcon, Activity02Icon, MicroscopeIcon } from 'hugeicons-react';

const serviceCategories = [
  {
    title: 'Haematology',
    icon: DropletIcon,
    color: 'from-red-500/10 to-red-500/5',
    iconColor: 'text-red-600',
    tests: [
      'Full Blood Count',
      'Malaria and Typhoid Test',
      'Blood Group and Genotype',
    ],
  },
  {
    title: 'Clinical Chemistry',
    icon: TestTubeIcon,
    color: 'from-blue-500/10 to-blue-500/5',
    iconColor: 'text-blue-600',
    tests: [
      'Kidney Function Test',
      'Liver Function Test',
      'Cholesterol Test',
    ],
  },
  {
    title: 'Immunoassay',
    icon: Activity02Icon,
    color: 'from-purple-500/10 to-purple-500/5',
    iconColor: 'text-purple-600',
    tests: [
      'Hormonal Profile',
      'Prostate Specific Antigen',
      'Thyroid Function Test',
    ],
  },
  {
    title: 'Microbiology',
    icon: MicroscopeIcon,
    color: 'from-green-500/10 to-green-500/5',
    iconColor: 'text-green-600',
    tests: [
      'Infection Tests',
      'Blood Culture',
      'Semen Analysis',
    ],
  },
];

export default function ServicesDetailed() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto mb-section-gap">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 id='lab-service' className="font-headline-lg text-headline-lg text-on-surface mb-4">
          Our Laboratory Services
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
          Comprehensive diagnostic testing with state-of-the-art equipment
        </p>

        {/* Operating Hours */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-6 bg-surface-container-lowest rounded-2xl px-8 py-4 border border-outline-variant/20 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Calendar03Icon size={20} className="text-primary" />
            <span className="font-body-md text-on-surface font-semibold">
              Monday - Saturday
            </span>
          </div>
          <div className="w-px h-6 bg-outline-variant/30" />
          <div className="flex items-center gap-2">
            <Time02Icon size={20} className="text-primary" />
            <span className="font-body-md text-on-surface font-semibold">
              8:00 AM - 8:00 PM
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {serviceCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface-container-lowest rounded-2xl p-6 card-lift border border-outline-variant/20 relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24} className={category.iconColor} />
                </div>

                <h3 className="font-headline-md text-xl text-on-surface mb-4 font-bold">
                  {category.title}
                </h3>

                <ul className="space-y-2">
                  {category.tests.map((test, testIndex) => (
                    <li
                      key={testIndex}
                      className="font-body-md text-sm text-on-surface-variant flex items-start gap-2"
                    >
                      <span className="text-primary mt-1">•</span>
                      <span>{test}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
