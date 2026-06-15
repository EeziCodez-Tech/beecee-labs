'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight01Icon, ArrowUpRight01Icon, UserShield01Icon, MedicalMaskIcon, FlashIcon, Clock05Icon, Location04Icon, Hospital01Icon, School01Icon, UserIcon, Restaurant01Icon, HeartCheckIcon, Home01Icon, Call02Icon, Mail01Icon, Clock01Icon, SentIcon, CheckmarkCircle02Icon, WhatsappIcon } from 'hugeicons-react';
import ScrollProgress from '@/components/ScrollProgress';
import Testimonials from '@/components/Testimonials';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServicesDetailed from '@/components/ServicesDetailed';
import Gallery from '@/components/Gallery';
import FAQ from '@/components/FAQ';
import Image from 'next/image';

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', requestType: 'schedule-appointment', honeypot: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [typedHeading, setTypedHeading] = useState('');
  const [typedSubheading, setTypedSubheading] = useState('');
  const [typedDescription, setTypedDescription] = useState('');
  const [headingComplete, setHeadingComplete] = useState(false);
  const [subheadingComplete, setSubheadingComplete] = useState(false);
  const [descriptionComplete, setDescriptionComplete] = useState(false);

  const headingText = "Accurate Diagnostics. ";
  const subheadingText = "Exceptional Care.";
  const descriptionText = "Quality and precise medical laboratory services with qualified professionals, relevant equipment, and accurate timely results you can trust.";

  // Typing effect for heading
  useEffect(() => {
    if (typedHeading.length < headingText.length) {
      const timeout = setTimeout(() => {
        setTypedHeading(headingText.slice(0, typedHeading.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      setHeadingComplete(true);
    }
  }, [typedHeading]);

  // Typing effect for subheading (starts after heading)
  useEffect(() => {
    if (headingComplete && typedSubheading.length < subheadingText.length) {
      const timeout = setTimeout(() => {
        setTypedSubheading(subheadingText.slice(0, typedSubheading.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    } else if (typedSubheading.length === subheadingText.length) {
      setSubheadingComplete(true);
    }
  }, [typedSubheading, headingComplete]);

  // Typing effect for description (starts after subheading)
  useEffect(() => {
    if (subheadingComplete && typedDescription.length < descriptionText.length) {
      const timeout = setTimeout(() => {
        setTypedDescription(descriptionText.slice(0, typedDescription.length + 1));
      }, 25);
      return () => clearTimeout(timeout);
    } else if (typedDescription.length === descriptionText.length) {
      setDescriptionComplete(true);
    }
  }, [typedDescription, subheadingComplete]);

  const requestTypeOptions = [
    { value: 'schedule-appointment', label: 'Schedule Lab Appointment' },
    { value: 'partnership-inquiry', label: 'Discuss Partnership Options' },
    { value: 'general-inquiry', label: 'General Inquiry' },
    { value: 'test-results', label: 'Test Results Follow-up' },
    { value: 'corporate-wellness', label: 'Corporate Wellness Program' },
    { value: 'home-service', label: 'Home Collection Service' },
  ];

  const selectedOption = requestTypeOptions.find(opt => opt.value === form.requestType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Check honeypot (should be empty)
      if (form.honeypot) {
        // Bot detected, silently fail
        setSubmitting(false);
        return;
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json() as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '', requestType: 'schedule-appointment', honeypot: '' });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit request. Please try again.';
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ScrollProgress />

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/2348023584869"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.6)] flex items-center justify-center transition-all duration-300 group"
      >
        <WhatsappIcon size={28} className="text-white" />
        <span className="absolute right-full mr-3 bg-on-surface text-surface px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
          Chat with us
        </span>
      </motion.a>

      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-on-surface/80 backdrop-blur-xl border-b border-outline-variant/10 shadow-sm">
        <div className="flex justify-between items-center px-4 md:px-margin-desktop py-3 md:py-4 max-w-9xl mx-auto gap-2 md:gap-4">
          <div className="flex items-center gap-1 flex-shrink-0">
            <Image alt="BeeCee Medical Logo"
              className="w-auto h-10 md:h-12"
              src="/images/beecee-header.png"
              width={150}
              height={150} />
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <a
              className="font-body-md text-body-md text-primary font-bold border-b-2 border-primary pb-1 active:scale-95 transition-transform"
              href="#hero"
            >
              Diagnostic Hub
            </a>
            <a
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300 active:scale-95 transition-transform"
              href="#foundation"
            >
              Foundation
            </a>
            <a
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300 active:scale-95 transition-transform"
              href="#services"
            >
              Scientific Advisory
            </a>
            <a
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300 active:scale-95 transition-transform"
              href="#lab-service"
            >
              Services
            </a>
            <a
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300 active:scale-95 transition-transform"
              href="#partnerships"
            >
              Partnerships
            </a>
          </div>

          <button
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary hover:bg-primary-container text-on-primary font-body-md text-sm md:text-body-md px-3 py-2 md:px-6 md:py-2.5 rounded-full shadow-sm btn-magnetic flex items-center gap-1 md:gap-2 cursor-pointer flex-shrink-0"
          >
            <span className="hidden sm:inline">Book Now</span>
            <span className="sm:hidden">Book Now</span>
            <ArrowRight01Icon size={16} className="md:w-[18px] md:h-[18px]" />
          </button>
        </div>
      </nav>

      <main className="pt-20 pb-section-gap space-y-32">
        {/* HERO SECTION */}
        <section className="relative px-margin-mobile md:px-margin-desktop max-w-[1400px] mx-auto min-h-[95vh] flex items-center overflow-hidden" id="hero">
          {/* Background Elements */}
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -z-10"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full py-16">
            {/* Left side - Text content */}
            <div className="lg:col-span-5 space-y-8 z-10 relative">


              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-headline-xl text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-bold text-on-surface min-h-[180px] md:min-h-[200px]"
              >
                {typedHeading}
                {!headingComplete && (
                  <span className="inline-block w-[4px] h-12 md:h-16 bg-on-surface ml-1 animate-pulse align-middle"></span>
                )}
                {headingComplete && (
                  <>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient">
                      {typedSubheading}
                      {!subheadingComplete && (
                        <span className="inline-block w-[4px] h-12 md:h-16 bg-primary ml-1 animate-pulse align-middle"></span>
                      )}
                    </span>
                  </>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-on-surface-variant leading-relaxed max-w-lg min-h-[80px]"
              >
                {typedDescription}
                {!descriptionComplete && (
                  <span className="inline-block w-[3px] h-5 bg-primary ml-1 animate-pulse"></span>
                )}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <button
                  onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-primary hover:bg-primary/90 text-on-primary text-base px-8 py-4 rounded-2xl shadow-[0_8px_30px_rgba(0,72,175,0.3)] hover:shadow-[0_12px_40px_rgba(0,72,175,0.4)] transition-all duration-300 flex items-center justify-center gap-2 font-semibold group cursor-pointer"
                >
                  Schedule Test
                  <ArrowRight01Icon size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-surface-container-low hover:bg-surface-container text-on-surface text-base px-8 py-4 rounded-2xl border border-outline-variant/30 transition-all duration-300 flex items-center justify-center gap-2 font-semibold cursor-pointer"
                >
                  View Services
                  <ArrowUpRight01Icon size={20} />
                </button>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-outline-variant/20"
              >
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">Quality</div>
                  <div className="text-sm text-on-surface-variant">Accurate Results</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-on-surface-variant">Licensed Professionals</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">Trusted</div>
                  <div className="text-sm text-on-surface-variant">Patient Care</div>
                </div>
              </motion.div>
            </div>

            {/* Right side - Image with floating cards */}
            <div className="lg:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                {/* Main Image */}
                <div className="relative h-[500px] lg:h-[700px] rounded-[2rem] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.12)] border border-outline-variant/20">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent z-10"></div>
                  <Image
                    alt="Modern medical diagnostic laboratory"
                    className="w-full h-full object-cover object-center"
                    src="/images/beecee-hero.png"
                    width={1400}
                    height={1000}
                  />
                </div>

                {/* Floating Card 1 - Top Left */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -top-6 -left-6 bg-surface border border-outline-variant/20 rounded-2xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl hidden lg:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <UserShield01Icon size={24} className="text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-on-surface">Certified Lab</div>
                      <div className="text-xs text-on-surface-variant">ISO Accredited</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Card 2 - Bottom Right */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute -bottom-6 -right-6 bg-surface border border-outline-variant/20 rounded-2xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl hidden lg:block"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <Clock05Icon size={28} className="text-secondary" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-on-surface">Timely Results</div>
                      <div className="text-sm text-on-surface-variant">Fast Turnaround</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge - Top Right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="absolute top-8 -right-4 bg-secondary text-on-primary rounded-full px-5 py-3 shadow-[0_8px_30px_rgba(0,72,175,0.3)] hidden lg:flex items-center gap-2"
                >
                  <MedicalMaskIcon size={20} />
                  <span className="font-semibold text-sm">Modern Equipment</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FOUNDATION SECTION */}
        <section className="bg-surface-container-low py-24 relative overflow-hidden" id="foundation">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-0"></div>
          <div className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block font-headline-md text-sm text-primary font-bold tracking-widest mb-4">
                OUR FOUNDATION
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Driven by Purpose
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-surface rounded-3xl p-10 border border-outline-variant/20 card-lift shadow-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-full -z-0 group-hover:scale-125 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <HeartCheckIcon size={28} className="text-primary" />
                  </div>
                  <span className="font-headline-md text-sm text-primary font-bold tracking-widest">
                    01 / OUR VISION
                  </span>
                  <h3 className="font-headline-lg text-3xl font-bold text-on-surface mt-2 mb-4">
                    Vision
                  </h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    To support excellence in patient care and safety by providing
                    accurate and timely laboratory information and services to
                    improve the health of individuals and communities.
                  </p>
                </div>
              </motion.div>

              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-surface rounded-3xl p-10 border border-outline-variant/20 card-lift shadow-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 rounded-bl-full -z-0 group-hover:scale-125 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FlashIcon size={28} className="text-secondary" />
                  </div>
                  <span className="font-headline-md text-sm text-secondary font-bold tracking-widest">
                    02 / OUR MISSION
                  </span>
                  <h3 className="font-headline-lg text-3xl font-bold text-on-surface mt-2 mb-4">
                    Mission
                  </h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    To provide quality laboratory services in a timely, accurate,
                    and efficient manner to ensure high-quality patient care and
                    enhance patient health.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* COMPREHENSIVE DIAGNOSTICS BENTO */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto mb-section-gap" id="services">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <div className="max-w-2xl">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
                Comprehensive Diagnostics
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Specialized screening panels tailored for personal, professional,
                and corporate requirements.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 card-lift flex flex-col justify-between min-h-[240px] group shadow-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Hospital01Icon size={24} className="text-primary" />
                </div>
              </div>
              <div>
                <h4 className="font-headline-md text-2xl font-bold text-on-surface mb-3">
                  Onsite Medical Screening
                </h4>
                <p className="font-body-md text-base text-on-surface-variant leading-relaxed">
                  Professional medical screening services delivered directly
                  to your organization or facility for convenience and efficiency.
                </p>
              </div>
            </motion.div>

            {/* Service Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 card-lift flex flex-col justify-between min-h-[240px] group shadow-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center group-hover:scale-110 transition-transform">
                  <School01Icon size={24} className="text-primary" />
                </div>
              </div>
              <div>
                <h4 className="font-headline-md text-2xl font-bold text-on-surface mb-3">
                  Pre-admission Screening
                </h4>
                <p className="font-body-md text-base text-on-surface-variant leading-relaxed">
                  Comprehensive diagnostic testing and health evaluations
                  required for admission into educational institutions.
                </p>
              </div>
            </motion.div>

            {/* Service Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 card-lift flex flex-col justify-between min-h-[240px] group shadow-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserIcon size={24} className="text-primary" />
                </div>
              </div>
              <div>
                <h4 className="font-headline-md text-2xl font-bold text-on-surface mb-3">
                  Pre-employment Screening
                </h4>
                <p className="font-body-md text-base text-on-surface-variant leading-relaxed">
                  Medical fitness evaluations to help organizations onboard
                  employees safely and verify baseline health standards.
                </p>
              </div>
            </motion.div>

            {/* Service Item 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 card-lift flex flex-col justify-between min-h-[240px] group shadow-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Restaurant01Icon size={24} className="text-primary" />
                </div>
              </div>
              <div>
                <h4 className="font-headline-md text-2xl font-bold text-on-surface mb-3">
                  Food Handlers Screening
                </h4>
                <p className="font-body-md text-base text-on-surface-variant leading-relaxed">
                  Essential health and hygiene testing to ensure regulatory
                  compliance for personnel in the food and hospitality sector.
                </p>
              </div>
            </motion.div>

            {/* Service Item 5 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 card-lift flex flex-col justify-between min-h-[240px] group lg:col-span-2 relative overflow-hidden shadow-sm"
            >
              <div className="absolute right-0 bottom-0 w-48 h-48 bg-primary/5 rounded-tl-full -z-0"></div>
              <div className="flex justify-between items-start mb-6 z-10 relative">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center group-hover:scale-110 transition-transform">
                    <HeartCheckIcon size={24} className="text-primary" />
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center group-hover:scale-110 transition-transform delay-75">
                    <Home01Icon size={24} className="text-primary" />
                  </div>
                </div>
              </div>
              <div className="z-10 relative">
                <h4 className="font-headline-md text-2xl font-bold text-on-surface mb-3">
                  Pre-marital/Fertility &amp; Home Handlers
                </h4>
                <p className="font-body-md text-base text-on-surface-variant leading-relaxed max-w-3xl">
                  Comprehensive screening for couples planning their future,
                  alongside essential health evaluations for domestic staff and
                  home handlers/maids to ensure household safety.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* WHY CHOOSE US SECTION */}
        <WhyChooseUs />

        {/* DETAILED SERVICES SECTION */}
        <ServicesDetailed />

        {/* GALLERY SECTION */}
        <Gallery />

        {/* TESTIMONIALS SECTION */}
        <Testimonials />

        {/* PARTNERSHIP BANNER */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto mb-section-gap" id="partnerships">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-on-primary-fixed rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
          >
            {/* Ambient Glow */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/20 rounded-full blur-[100px] opacity-60 mix-blend-screen"></div>
            </div>

            <div className="z-10 relative max-w-2xl">
              <h2 className="font-headline-lg text-headline-lg text-surface mb-4">
                Corporate &amp; Institutional Partnerships
              </h2>
              <p className="font-body-lg text-body-lg text-surface-dim opacity-90 mb-6">
                Flexible partnerships available via Monthly Retainership or Fee
                for Service. A trial will convince you.
              </p>
              <div className="flex items-center gap-6">
                <span className="font-label-sm text-label-sm text-surface-dim">
                  Fee for Service Available
                </span>
              </div>
            </div>

            <div className="z-10 relative shrink-0">
              <button
                onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-surface text-primary font-body-md text-body-md font-bold px-8 py-4 rounded-xl shadow-lg btn-magnetic whitespace-nowrap cursor-pointer"
              >
                Discuss Options
              </button>
            </div>
          </motion.div>
        </section>

        {/* FAQ SECTION */}
        <FAQ />
      </main>

      {/* Footer */}
      <footer className="relative w-full bg-on-surface overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Newsletter CTA Band */}
        <div className="px-margin-mobile md:px-margin-desktop max-w-7xl mb-12 mx-auto pt-section-gap relative z-10" id="cta">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary to-primary-container rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-[0_20px_60px_rgba(0,72,175,0.3)]"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              {/* Main Footer Content */}
              <div className="flex flex-col gap-10">
                {/* Brand Column */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Image alt="BeeCee Medical Logo"
                      className="w-auto"
                      src="/images/beecee-footer.png"
                      width={220}
                      height={220} />
                  </div>

                  <p className="font-body-md text-on-primary/80 leading-relaxed max-w-md">
                    Share your details and our team will reach out to schedule your appointment and send confirmation by email.
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-5">
                  <a href="tel:+2348102918085" className="flex items-center gap-3 text-on-primary/90 hover:text-on-primary transition-colors group">
                    <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
                      <Call02Icon size={18} className="text-on-primary" />
                    </span>
                    <span className="text-base font-medium">+234 810 291 8085</span>
                  </a>
                  <a href="mailto:beeceelaboratory@gmail.com" className="flex items-center gap-3 text-on-primary/90 hover:text-on-primary transition-colors group">
                    <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
                      <Mail01Icon size={18} className="text-on-primary" />
                    </span>
                    <span className="text-base font-medium">beeceelaboratory@gmail.com</span>
                  </a>
                  <div className="flex items-center gap-3 text-on-primary/90">
                    <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Clock01Icon size={18} className="text-on-primary" />
                    </span>
                    <span className="text-base font-medium">Mon &ndash; Sat: 8:00 AM &ndash; 8:00 PM</span>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full lg:max-w-md bg-surface rounded-2xl p-8 flex flex-col items-center text-center gap-3"
                  >
                    <CheckmarkCircle02Icon size={48} className="text-secondary" />
                    <h4 className="font-headline-md text-xl font-bold text-on-surface">
                      Request Received!
                    </h4>
                    <p className="text-on-surface-variant text-sm">
                      Thank you. Our team will contact you shortly to confirm your
                      lab visit.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="w-full lg:max-w-md flex flex-col gap-3 shrink-0"
                  >
                    <div className="relative">
                      <UserIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Full name"
                        className="w-full bg-surface text-on-surface placeholder:text-on-surface-variant rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-white/50 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full bg-surface text-on-surface rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-white/50 transition-all flex items-center justify-between cursor-pointer hover:bg-surface-container"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-sm">{selectedOption?.label}</span>
                        </span>
                        <motion.svg
                          animate={{ rotate: dropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="text-on-surface-variant"
                        >
                          <path
                            d="M5 7.5L10 12.5L15 7.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      </button>

                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden z-50 border border-outline-variant/20"
                          >
                            {requestTypeOptions.map((option, index) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                  setForm({ ...form, requestType: option.value });
                                  setDropdownOpen(false);
                                }}
                                className={`w-full px-4 py-3 flex items-center gap-3 transition-all hover:bg-primary/10 ${form.requestType === option.value ? 'bg-primary/5' : ''
                                  } ${index !== requestTypeOptions.length - 1 ? 'border-b border-outline-variant/10' : ''
                                  }`}
                              >
                                <span className="text-sm text-on-surface font-medium">{option.label}</span>
                                {form.requestType === option.value && (
                                  <CheckmarkCircle02Icon size={18} className="ml-auto text-primary" />
                                )}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Mail01Icon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="Email address"
                          className="w-full bg-surface text-on-surface placeholder:text-on-surface-variant rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-white/50 transition-all"
                        />
                      </div>
                      <div className="relative flex-1">
                        <Call02Icon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="Phone number"
                          className="w-full bg-surface text-on-surface placeholder:text-on-surface-variant rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-white/50 transition-all"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <textarea
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Describe what you'd like to come in for (e.g., blood test, health screening, etc.)"
                        rows={4}
                        className="w-full bg-surface text-on-surface placeholder:text-on-surface-variant rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none"
                      />
                    </div>
                    {/* Honeypot field - hidden from users, bots will fill it */}
                    <input
                      type="text"
                      name="website"
                      value={form.honeypot}
                      onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                      className="absolute -left-[9999px]"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-on-surface hover:bg-on-surface/90 disabled:opacity-70 disabled:cursor-not-allowed text-surface font-semibold px-7 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 group"
                    >
                      {submitting ? 'Sending...' : 'Request Appointment'}
                      <SentIcon size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-surface-variant/10 relative z-10">
          <div className="px-margin-mobile md:px-margin-desktop max-w-9xl mx-auto py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <p className="font-body-md text-sm text-surface-variant/60">
                © 2026 BeeCee Medical Laboratory Services. All rights reserved.
              </p>
              <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-surface-variant/20">
                <span className="font-label-sm text-xs text-surface-variant/60">RC: 9282790</span>
              </span>
            </div>
            <div className="text-surface-variant/60 text-xs">
              <a
                href="https://www.google.com/maps/dir//BeeCee+Medical+Laboratory+Services,+1+De-paul+close+yakoyo+busstop+claret+plaza.+Ojudu+Berger,+Ojodu,+Lagos/@6.6470566,3.3741544,716m/data=!3m1!1e3!4m17!1m7!3m6!1s0x103b931d6d7cae97:0xda15d891898315b5!2sBeeCee+Medical+Laboratory+Services!8m2!3d6.6470566!4d3.3741544!16s%2Fg%2F11z7nm23d8!4m8!1m0!1m5!1m1!1s0x103b931d6d7cae97:0xda15d891898315b5!2m2!1d3.3741544!2d6.6470566!3e0?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Location04Icon size={16} />
                <span>Claret Plaza, 1 De-Paul Close, Yakoyo Bus-stop, Berger, Nigeria</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
