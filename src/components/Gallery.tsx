'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cancel01Icon, ArrowLeft01Icon, ArrowRight01Icon, ZoomInAreaIcon } from 'hugeicons-react';
import Image from 'next/image';

const images = [
  { src: '/images/beecee1.jpeg', span: 'md:col-span-2 md:row-span-2' },
  { src: '/images/beecee2.jpeg', span: '' },
  { src: '/images/beecee3.jpeg', span: '' },
  { src: '/images/beecee4.jpeg', span: '' },
  { src: '/images/beecee5.jpeg', span: 'md:row-span-2' },
  { src: '/images/beecee6.jpeg', span: '' },
  { src: '/images/beecee7.jpeg', span: '' },
  { src: '/images/beecee8.jpeg', span: '' },
  { src: '/images/beecee9.jpeg', span: 'md:col-span-2' },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);
  const showPrev = () =>
    setActiveIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
  const showNext = () =>
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % images.length));

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto mb-section-gap" id="gallery">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="inline-block font-headline-md text-sm text-primary font-bold tracking-widest mb-4">
          OUR FACILITY
        </span>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
          Inside BeeCee Medical
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          A glimpse into our state-of-the-art laboratory, dedicated team, and the
          environment where precision diagnostics come to life.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] gap-4">
        {images.map((image, index) => (
          <motion.button
            key={image.src}
            type="button"
            onClick={() => openLightbox(index)}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
            className={`group relative overflow-hidden rounded-3xl shadow-sm border border-outline-variant/20 ${image.span}`}
          >
            <Image
              alt={`BeeCee Medical facility ${index + 1}`}
              src={image.src}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="w-12 h-12 rounded-full bg-surface/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <ZoomInAreaIcon size={22} className="text-primary" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] bg-on-surface/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            {/* Close */}
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close gallery"
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-surface/10 hover:bg-surface/20 text-surface flex items-center justify-center transition-colors z-10"
            >
              <Cancel01Icon size={24} />
            </button>

            {/* Prev */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              aria-label="Previous image"
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-surface/10 hover:bg-surface/20 text-surface flex items-center justify-center transition-colors z-10"
            >
              <ArrowLeft01Icon size={24} />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              aria-label="Next image"
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-surface/10 hover:bg-surface/20 text-surface flex items-center justify-center transition-colors z-10"
            >
              <ArrowRight01Icon size={24} />
            </button>

            {/* Image */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[70vh] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                alt={`BeeCee Medical facility ${activeIndex + 1}`}
                src={images[activeIndex].src}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-surface/80 text-sm font-medium">
              {activeIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
