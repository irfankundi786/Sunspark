import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const Pricing = () => {
  return (
    <section className="py-16 md:py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Basic */}
          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-3xl shadow-sm border border-outline-variant/10">
            <h4 className="text-xl md:text-2xl font-bold mb-4">Residential Starter</h4>
            <p className="text-3xl md:text-4xl font-black mb-8">500,000 RS <span className="text-lg font-normal text-on-surface-variant">/ avg</span></p>
            <ul className="space-y-4 mb-10 text-on-surface-variant text-sm md:text-base">
              {["5kW Kinetic Array", "Standard Mounting", "10 Year Warranty", "Mobile App Access"].map((item, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> {item}</li>
              ))}
            </ul>
            <button className="w-full py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all">Select Plan</button>
          </div>
          
          {/* Pro */}
          <div className="bg-primary text-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl md:scale-105 relative z-20">
            <span className="absolute top-6 right-6 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter">Most Popular</span>
            <h4 className="text-xl md:text-2xl font-bold mb-4">Elite Pro Flow</h4>
            <p className="text-3xl md:text-4xl font-black mb-8">10 Lac RS <span className="text-lg font-normal text-white/70">/ avg</span></p>
            <ul className="space-y-4 mb-10 text-sm md:text-base">
              {["12kW Kinetic Array", "10kWh Battery Storage", "25 Year Performance", "24/7 Priority Support"].map((item, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> {item}</li>
              ))}
            </ul>
            <button className="w-full py-4 bg-white text-primary font-black rounded-xl hover:bg-surface-container-low transition-all shadow-xl">Get Started Now</button>
          </div>
          
          {/* Enterprise */}
          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-3xl shadow-sm border border-outline-variant/10 md:col-span-2 lg:col-span-1">
            <h4 className="text-xl md:text-2xl font-bold mb-4">Utility Scale</h4>
            <p className="text-3xl md:text-4xl font-black mb-8">Custom <span className="text-lg font-normal text-on-surface-variant">/ quote (RS)</span></p>
            <ul className="space-y-4 mb-10 text-on-surface-variant text-sm md:text-base">
              {["Mega-scale Arrays", "Containerized Storage", "AI Grid Management", "Dedicated Site Team"].map((item, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> {item}</li>
              ))}
            </ul>
            <button className="w-full py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all">Contact Sales</button>
          </div>
          
        </div>
      </div>
    </section>
  );
};