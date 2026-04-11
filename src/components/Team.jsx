import React from 'react';
import { motion } from 'motion/react';
import { Share2 } from 'lucide-react';

export const Team = ({ team }) => {
  return (
    <motion.section 
      aria-labelledby="team-heading"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-16 md:py-32 bg-surface border-b border-surface-container"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12 md:mb-20">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Meet Our Experts</span>
          <h2 id="team-heading" className="text-3xl md:text-5xl font-black tracking-tight text-on-surface uppercase">Engineering The Future</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mt-4 text-sm md:text-base">A dedicated team of industry pioneers committed to revolutionizing sustainable energy.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative">
                <img 
                  alt={`Portrait of ${member.name}, ${member.role}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  src={member.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center" aria-label={`Share profile of ${member.name}`}>
                    <Share2 className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <h4 className="text-xl font-bold text-on-surface">{member.name}</h4>
              <p className="text-primary font-semibold text-sm uppercase tracking-wide">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};