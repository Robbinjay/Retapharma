"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const slides = [
  {
    id: 1,
    image: '/best-peptides-anti-aging-research-ghk-cu-nad-547-hero-1.webp',
    title: 'Retatrutide Pharmacy & Peptide Information',
    subtitle: 'Supporting research with transparent product information, high-purity peptides, and comprehensive batch documentation.',
    primaryCta: { text: 'Explore Retatrutide', href: '/retatrutide' },
    secondaryCta: { text: 'View Laboratory Data', href: '/laboratory-testing' },
  },
  {
    id: 2,
    image: '/eYD3mAu9qaw969vcK9I7w57EQ2g.avif',
    title: 'Transparency Starts With Testing',
    subtitle: 'Access batch-specific laboratory information and detailed analytical documentation for every product we supply.',
    primaryCta: { text: 'View Batch Data', href: '/batch-data' },
    secondaryCta: null,
  },
  {
    id: 3,
    image: '/0dc86a8b80921e032fd77205d456c9b8bcd9a934-1536x1024.avif',
    title: 'Explore Peptide Research',
    subtitle: 'Sale of peptides for research purposes. Providing reliable materials for scientific advancement.',
    primaryCta: { text: 'Explore Research', href: '/peptide-information' },
    secondaryCta: { text: 'Shop Products', href: '/shop' },
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section className="relative w-full h-[600px] md:h-[750px] overflow-hidden bg-slate-900 group" aria-label="Featured content slider">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-slate-900/60 z-10" />
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            priority={currentSlide === 0}
            className="object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl tracking-tight leading-tight mb-6"
            >
              {slides[currentSlide].title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-200 max-w-2xl mb-10"
            >
              {slides[currentSlide].subtitle}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href={slides[currentSlide].primaryCta.href}
                className="bg-white text-slate-900 px-8 py-4 rounded-md font-semibold hover:bg-slate-100 transition-colors"
              >
                {slides[currentSlide].primaryCta.text}
              </Link>
              {slides[currentSlide].secondaryCta && (
                <Link
                  href={slides[currentSlide].secondaryCta.href}
                  className="bg-transparent border border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white/10 transition-colors"
                >
                  {slides[currentSlide].secondaryCta.text}
                </Link>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-6">
        <button
          onClick={prevSlide}
          className="p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-2 text-white/70 hover:text-white transition-colors absolute -right-16"
          aria-label={isPaused ? "Play slider" : "Pause slider"}
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>
      </div>
    </section>
  );
}
