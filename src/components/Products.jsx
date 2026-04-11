import React from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

export const Products = ({ products }) => {
  // Duplicate the array to create the seamless infinite scroll effect
  const duplicatedProducts = [...products, ...products];

  return (
    <section id="products" className="relative py-16 md:py-24 bg-surface-container-lowest overflow-hidden border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12 md:mb-16">
        <div className="text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
            <Zap className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          </div>
          <span className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-4 block">Premium Components</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-on-surface uppercase">Products We Deal In</h2>
          <p className="text-on-surface-variant mt-2 md:mt-4 text-sm md:text-base">Discover our range of high-performance solar components.</p>
          <div className="w-16 md:w-24 h-1 md:h-1.5 bg-primary mx-auto mt-4 md:mt-6 rounded-full" />
        </div>
      </div>
      
      <div className="relative w-full">
        {/* Notice we use products.length here instead of the hardcoded PRODUCTS_DEAL */}
        <motion.div 
          className="flex gap-8 whitespace-nowrap" 
          animate={{ x: [0, -100 * products.length - 32 * products.length] }} 
          transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" } }}
        >
          {duplicatedProducts.map((product, index) => (
            <div key={index} className="w-[300px] flex-shrink-0">
              <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-lg border border-surface-container-high h-full flex flex-col items-center text-center group transition-all duration-500 hover:shadow-2xl hover:border-primary/20">
                <div className="relative w-full aspect-square mb-6 rounded-2xl overflow-hidden bg-surface-container-low flex items-center justify-center">
                  <div className="absolute top-3 left-3 z-10 bg-primary/90 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter shadow-lg">Premium</div>
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed whitespace-normal">{product.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Gradient Fades for the edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface-container-lowest to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface-container-lowest to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};