import React from 'react';

export const Cta = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-8 max-w-7xl mx-auto" aria-labelledby="cta-heading">
      <div className="energy-flow-gradient rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 text-center text-white relative overflow-hidden">
        <h2 id="cta-heading" className="text-3xl md:text-7xl font-black tracking-tight mb-6 md:mb-8 relative z-10 uppercase">
          READY TO HARVEST THE SUN?
        </h2>
        <p className="text-lg md:text-2xl text-white/80 mb-8 md:mb-12 max-w-3xl mx-auto relative z-10">
          Join over 5,000 forward-thinking households and businesses in the kinetic revolution.
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 relative z-10">
          <button className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white text-primary text-base md:text-lg font-black rounded-full shadow-2xl hover:scale-105 transition-transform" aria-label="Get a solar quote today">
            Get a Quote Today
          </button>
          <button className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-black/20 backdrop-blur-xl border border-white/20 text-white text-base md:text-lg font-black rounded-full hover:bg-white/10 transition-all" aria-label="Schedule a site survey">
            Schedule Survey
          </button>
        </div>
      </div>
    </section>
  );
};