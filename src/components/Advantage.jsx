import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Leaf, Wrench, PiggyBank, Zap, BarChart3 } from 'lucide-react';

export const Advantage = () => {
  const advantages = [
    { icon: ShieldCheck, title: "25 Year Warranty", desc: "Guaranteed performance for a quarter century of clean energy." },
    { icon: Leaf, title: "Eco-Precision", desc: "Materials sourced with zero-waste manufacturing protocols." },
    { icon: Wrench, title: "Expert Install", desc: "In-house engineering teams with master-level certifications." },
    { icon: PiggyBank, title: "ROI Focused", desc: "Designed to pay for itself within 5-7 years of operation." },
    { icon: Zap, title: "Smart Harvesting", desc: "Intelligent tracking systems that follow the sun's trajectory." },
    { icon: BarChart3, title: "Live Monitoring", desc: "Real-time data visualization of your energy production." }
  ];

  return (
    <section className="py-16 md:py-32 bg-on-surface text-white rounded-t-[2rem] md:rounded-t-[4rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center mb-12 md:mb-20">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 uppercase">The SunSpark Advantage</h2>
        <p className="text-white/60 text-sm md:text-base">Why world-class organizations trust our premium solar technology.</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
        {advantages.map((adv, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center group"
          >
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <adv.icon className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
            </div>
            <h5 className="text-2xl font-bold mb-3">{adv.title}</h5>
            <p className="text-white/50 leading-relaxed">{adv.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};