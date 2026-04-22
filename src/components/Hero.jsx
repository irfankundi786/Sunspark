import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ArrowRightCircle } from "lucide-react";
import { cn } from "../lib/utils";

// We receive 'slides' as a prop from App.jsx
export const Hero = ({ slides }) => {
  // 1. Move the state INSIDE the component
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // 2. Move the scroll transform INSIDE the component
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 850], [0, 200]);

  // 3. Move the auto-slide timer INSIDE the component
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="home" className="relative h-[600px] sm:h-[700px] md:h-[850px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <motion.div style={{ y: y1 }} className="absolute inset-0 scale-110">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl sm:text-5xl md:text-7xl font-black text-white uppercase"
              >
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-white/90 mt-4 mb-8 text-lg"
              >
                {slides[currentSlide].description}
              </motion.p>

              <div className="flex gap-4">
                <button 
                className="px-6 py-3 bg-primary text-white rounded-full flex items-center gap-2 hover:scale-105 transition-transform"
                onClick={() => window.open("https://sun-wallet.vercel.app/", "_blank")}>
                  Solar Wallet (Energy Only) 
                  <ArrowRightCircle />
                </button>

                <button className="px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-black transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentSlide === index ? "bg-white w-8" : "bg-white/40"
            )}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};