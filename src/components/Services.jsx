import React from 'react';
import { motion } from 'motion/react';
import { Sun, ArrowRightCircle, ArrowUpRight } from 'lucide-react';

export const Services = ({ services }) => {
  return (
    <motion.section 
      id="services"
      aria-labelledby="services-heading"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-16 md:py-24 px-4 sm:px-8 max-w-7xl mx-auto bg-surface rounded-[2rem] md:rounded-[3rem] my-10 md:my-16 shadow-2xl shadow-surface-container/40 border border-surface-container"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 md:mb-16">
        <div>
          <span className="text-primary flex items-center gap-2 font-bold mb-2 uppercase tracking-widest text-sm">
            <Sun className="w-5 h-5" aria-hidden="true" /> Services
          </span>
          <h2 id="services-heading" className="text-3xl md:text-5xl font-black tracking-tight text-on-surface uppercase">Our Services</h2>
        </div>
        <button className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all" aria-label="View all solar services">
          View All <ArrowRightCircle className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -10 }}
            className="bg-surface-container-lowest rounded-3xl p-6 shadow-xl shadow-surface-container border border-surface-container flex flex-col group"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-8">
              <img 
                className="w-full h-full object-cover" 
                src={service.image} 
                alt={service.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 right-4">
                <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 px-2">{service.title}</h3>
            <p className="text-on-surface-variant leading-relaxed px-2 mb-4">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};