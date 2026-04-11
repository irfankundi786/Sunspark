import React from 'react';
import { motion } from 'motion/react';
import { Sun } from 'lucide-react';

export const Projects = ({ projects }) => {
  return (
    <motion.section 
      id="projects"
      aria-labelledby="projects-heading"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="py-16 md:py-24 bg-surface border-y border-surface-container shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full text-on-surface-variant text-sm font-bold uppercase tracking-widest mb-4">
            <Sun className="w-4 h-4 text-primary" aria-hidden="true" />
            Our Projects
          </div>
          <h2 id="projects-heading" className="text-3xl md:text-5xl font-black tracking-tight text-on-surface mb-6 uppercase">
            Our Latest <span className="text-primary">Projects</span>
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Pioneering sustainable energy transitions across Pakistan with precision-engineered solar infrastructure.
          </p>
        </motion.div>

        {/* Large Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          {projects.filter(p => p.size === 'large').map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative group rounded-3xl overflow-hidden aspect-[16/10] shadow-xl"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-8 z-10">
                <div className="bg-primary text-white px-4 py-1 rounded-lg text-sm font-bold mb-3 inline-block">
                  {project.category}
                </div>
                <div className="bg-surface-container-lowest text-on-surface px-6 py-3 rounded-xl shadow-lg">
                  <h4 className="text-xl font-bold">{project.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Small Projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.filter(p => p.size === 'small').map((project, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.02 }}
              className="relative group rounded-3xl overflow-hidden aspect-[4/3] shadow-lg"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 z-10">
                <div className="bg-primary text-white px-3 py-1 rounded-lg text-xs font-bold mb-2 inline-block">
                  {project.category}
                </div>
                <div className="bg-surface-container-lowest text-on-surface px-4 py-2 rounded-xl shadow-lg">
                  <h4 className="text-base font-bold">{project.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};