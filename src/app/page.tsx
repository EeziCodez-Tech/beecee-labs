'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight01Icon, ArrowUpRight01Icon, UserShield01Icon, MedicalMaskIcon, FlashIcon, Location04Icon, Hospital01Icon, School01Icon, UserIcon, Restaurant01Icon, HeartCheckIcon, Home01Icon, Call02Icon, Mail01Icon, Clock01Icon, Facebook01Icon, NewTwitterIcon, InstagramIcon, Linkedin01Icon, SentIcon, CheckmarkCircle02Icon } from 'hugeicons-react';
import ScrollProgress from '@/components/ScrollProgress';
import Testimonials from '@/components/Testimonials';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServicesDetailed from '@/components/ServicesDetailed';
import Gallery from '@/components/Gallery';
import FAQ from '@/components/FAQ';
import Image from 'next/image';

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate request submission. Replace with real API call/email service.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <ScrollProgress />

      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-on-surface/80 backdrop-blur-xl border-b border-outline-variant/10 shadow-sm">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-9xl mx-auto">
          <div className="flex items-center gap-1">
            <Image alt="BeeCee Medical Logo"
              className="w-auto"
              src="/images/beecee-header.png"
              width={256}
              height={256} />
          </div>

          <div className="hidden md:flex items-center gap-8">
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
            className="bg-primary hover:bg-primary-container text-on-primary font-body-md text-body-md px-6 py-2.5 rounded-full shadow-sm btn-magnetic flex items-center gap-2 cursor-pointer"
          >
            Book Appointment
            <ArrowRight01Icon size={18} />
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
                className="font-headline-xl text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-bold text-on-surface"
              >
                Accurate Diagnostics.{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient">
                  Exceptional Care.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-on-surface-variant leading-relaxed max-w-lg"
              >
                Comprehensive diagnostic services with cutting-edge technology,
                expert pathologists, and results you can trust.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <button className="bg-primary hover:bg-primary/90 text-on-primary text-base px-8 py-4 rounded-2xl shadow-[0_8px_30px_rgba(0,72,175,0.3)] hover:shadow-[0_12px_40px_rgba(0,72,175,0.4)] transition-all duration-300 flex items-center justify-center gap-2 font-semibold group">
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
                  <div className="text-3xl font-bold text-primary mb-1">15+</div>
                  <div className="text-sm text-on-surface-variant">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">50+</div>
                  <div className="text-sm text-on-surface-variant">Partner Clinics</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">99.9%</div>
                  <div className="text-sm text-on-surface-variant">Accuracy</div>
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
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <UserShield01Icon size={24} className="text-primary" />
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
                    <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <FlashIcon size={28} className="text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-on-surface">24/7</div>
                      <div className="text-sm text-on-surface-variant">Available</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge - Top Right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="absolute top-8 -right-4 bg-primary text-on-primary rounded-full px-5 py-3 shadow-[0_8px_30px_rgba(0,72,175,0.3)] hidden lg:flex items-center gap-2"
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
                  Onsite Medical
                </h4>
                <p className="font-body-md text-base text-on-surface-variant leading-relaxed">
                  Comprehensive corporate and community diagnostic programs
                  deployed directly to your facility, minimizing operational
                  downtime while ensuring total health compliance.
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
                  Pre-admission
                </h4>
                <p className="font-body-md text-base text-on-surface-variant leading-relaxed">
                  Rigorous diagnostic testing and statutory health evaluations
                  required for verified entry into domestic and international
                  educational institutions.
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
                  Pre-employment
                </h4>
                <p className="font-body-md text-base text-on-surface-variant leading-relaxed">
                  Tailored workforce fitness and medical capability standards
                  mapping to help organizations onboard talent safely and verify
                  baseline health metrics.
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
                  Food Handlers
                </h4>
                <p className="font-body-md text-base text-on-surface-variant leading-relaxed">
                  Critical diagnostic hygiene, microbial, and infectious disease
                  testing to enforce regulatory compliance for personnel in the
                  food and hospitality sector.
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
                  Domestic &amp; Family Planning
                </h4>
                <p className="font-body-md text-base text-on-surface-variant leading-relaxed max-w-3xl">
                  Discreet and highly accurate diagnostic profiles for couples
                  planning their future together, alongside essential health
                  screenings for domestic staff to safeguard your household.
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
                <div className="flex -space-x-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-on-primary-fixed flex items-center justify-center font-label-sm text-xs text-primary font-bold">
                    B2B
                  </div>
                  <div className="w-10 h-10 rounded-full bg-surface-container border-2 border-on-primary-fixed flex items-center justify-center font-label-sm text-xs text-primary font-bold">
                    SLA
                  </div>
                  <div className="w-10 h-10 rounded-full bg-surface-container-low border-2 border-on-primary-fixed flex items-center justify-center font-label-sm text-xs text-primary font-bold">
                    HMO
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-surface-dim">
                  Trusted by 50+ Clinics
                </span>
              </div>
            </div>

            <div className="z-10 relative shrink-0">
              <button className="bg-surface text-primary font-body-md text-body-md font-bold px-8 py-4 rounded-xl shadow-lg btn-magnetic whitespace-nowrap">
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
        <div className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto pt-section-gap relative z-10" id="cta">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary to-primary-container rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-[0_20px_60px_rgba(0,72,175,0.3)]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-md text-center lg:text-left shrink-0">
                <h3 className="font-headline-lg text-3xl md:text-4xl font-bold text-on-primary mb-3">
                  Request a Lab Visit
                </h3>
                <p className="font-body-lg text-on-primary/80 leading-relaxed">
                  Share your details and our team will reach out to schedule your
                  appointment and send confirmation by email.
                </p>
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

        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto py-16 relative z-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-4 space-y-6">
              <div className="flex items-center gap-2">
                <Image alt="BeeCee Medical Logo"
                  className="w-auto"
                  src="/images/beecee-footer.png"
                  width={256}
                  height={256} />
              </div>

              <p className="font-body-md text-surface-variant leading-relaxed max-w-xs">
                Clinical Excellence through Technology. Advancing diagnostics for
                better community health.
              </p>

              {/* Contact Details */}
              <div className="space-y-3">
                <a href="tel:+2348102918085" className="flex items-center gap-3 text-surface-variant hover:text-primary-fixed-dim transition-colors group">
                  <span className="w-9 h-9 rounded-xl bg-surface/10 flex items-center justify-center group-hover:bg-primary-fixed-dim/20 transition-colors">
                    <Call02Icon size={16} className="text-primary-fixed-dim" />
                  </span>
                  <span className="text-sm">+234 810 291 8085</span>
                </a>
                <a href="mailto:info@beeceemedical.com" className="flex items-center gap-3 text-surface-variant hover:text-primary-fixed-dim transition-colors group">
                  <span className="w-9 h-9 rounded-xl bg-surface/10 flex items-center justify-center group-hover:bg-primary-fixed-dim/20 transition-colors">
                    <Mail01Icon size={16} className="text-primary-fixed-dim" />
                  </span>
                  <span className="text-sm">info@beeceemedical.com</span>
                </a>
                <div className="flex items-center gap-3 text-surface-variant">
                  <span className="w-9 h-9 rounded-xl bg-surface/10 flex items-center justify-center">
                    <Clock01Icon size={16} className="text-primary-fixed-dim" />
                  </span>
                  <span className="text-sm">Mon &ndash; Sat: 8:00 AM &ndash; 8:00 PM</span>
                </div>
              </div>
            </div>

            {/* Operations */}
            <div className="md:col-span-2 space-y-5">
              <h4 className="font-label-sm text-sm text-surface uppercase tracking-wider font-semibold">
                Operations
              </h4>
              <div className="flex flex-col gap-3">
                {['Laboratory Network', 'Research & Development', 'Quality Assurance'].map((link) => (
                  <a
                    key={link}
                    className="font-body-md text-surface-variant hover:text-primary-fixed-dim hover:translate-x-1 transition-all duration-300 inline-block w-fit"
                    href="#"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="md:col-span-2 space-y-5">
              <h4 className="font-label-sm text-sm text-surface uppercase tracking-wider font-semibold">
                Legal
              </h4>
              <div className="flex flex-col gap-3">
                {['Privacy Protocol', 'Terms of Service', 'Compliance'].map((link) => (
                  <a
                    key={link}
                    className="font-body-md text-surface-variant hover:text-primary-fixed-dim hover:translate-x-1 transition-all duration-300 inline-block w-fit"
                    href="#"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div className="md:col-span-4 space-y-5">
              <h4 className="font-label-sm text-sm text-surface uppercase tracking-wider font-semibold">
                Connect
              </h4>
              <div className="flex flex-col gap-3">
                {['Investor Relations', 'Contact Support'].map((link) => (
                  <a
                    key={link}
                    className="font-body-md text-surface-variant hover:text-primary-fixed-dim hover:translate-x-1 transition-all duration-300 inline-block w-fit"
                    href="#"
                  >
                    {link}
                  </a>
                ))}
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2">
                {[
                  { Icon: Facebook01Icon, label: 'Facebook' },
                  { Icon: NewTwitterIcon, label: 'Twitter' },
                  { Icon: InstagramIcon, label: 'Instagram' },
                  { Icon: Linkedin01Icon, label: 'LinkedIn' },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-surface/10 flex items-center justify-center text-surface-variant hover:bg-primary hover:text-on-primary hover:-translate-y-1 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-surface-variant/10 relative z-10">
          <div className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto py-6 flex flex-col md:flex-row justify-between items-center gap-4">
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
