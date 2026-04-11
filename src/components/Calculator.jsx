import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator as CalculatorIcon } from 'lucide-react'; // Notice the alias here!

export const Calculator = () => {
  const [bill, setBill] = useState(15000);
  const [roofSize, setRoofSize] = useState(1000);
  const [location, setLocation] = useState('California');
  const [results, setResults] = useState(null);

  const calculateSavings = () => {
    const annualConsumption = bill * 12 * 8;
    const solarPotential = roofSize * 15;
    const actualGeneration = Math.min(annualConsumption, solarPotential);
    const annualSavings = actualGeneration * 0.15;
    const payback = 5.2;
    const co2Offset = actualGeneration * 0.0007;

    setResults({
      savings: Math.round(annualSavings),
      payback: payback,
      co2: Number(co2Offset.toFixed(1))
    });
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-100px" }} 
      className="py-16 md:py-32 bg-surface-container-low rounded-[2rem] md:rounded-[4rem] my-10 md:my-20 shadow-xl border border-surface-container mx-4 md:mx-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Savings Estimator</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 md:mb-8 leading-tight uppercase">
              HOW MUCH CAN YOU SAVE WITH <span className="text-primary">SUNSPARK?</span>
            </h2>
            <div className="space-y-6 bg-surface-container-lowest p-6 md:p-8 rounded-[2rem] md:rounded-3xl shadow-xl border border-outline-variant/10">
              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-2 uppercase tracking-wide">Monthly Bill (RS)</label>
                <input 
                  type="range" 
                  min="5000" 
                  max="100000" 
                  step="500" 
                  value={bill} 
                  onChange={(e) => setBill(Number(e.target.value))} 
                  className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary" 
                />
                <div className="flex justify-between mt-2 font-bold text-primary">
                  <span>5,000 RS</span>
                  <span className="text-2xl">{bill.toLocaleString()} RS</span>
                  <span>100,000 RS</span>
                </div>
              </div>
              <button 
                onClick={calculateSavings} 
                className="w-full py-5 bg-primary text-white font-black rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3"
              >
                {/* We use CalculatorIcon here instead of Calculator */}
                <CalculatorIcon className="w-6 h-6" /> Calculate My Savings
              </button>
            </div>
          </div>
          <div className="relative">
            <AnimatePresence mode="wait">
              {results ? (
                <motion.div key="results" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="grid grid-cols-1 gap-6">
                  <div className="bg-primary text-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    <span className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-80 mb-2 block">Annual Savings</span>
                    <h3 className="text-4xl md:text-6xl font-black mb-4">{results.savings.toLocaleString()} RS</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-outline-variant/10">
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">Payback Period</span>
                      <h4 className="text-2xl md:text-3xl font-black text-on-surface">{results.payback} Years</h4>
                    </div>
                    <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-outline-variant/10">
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">CO2 Offset</span>
                      <h4 className="text-2xl md:text-3xl font-black text-on-surface">{results.co2} Tons/Yr</h4>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="aspect-square bg-surface-container rounded-[3rem] border-4 border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center p-12">
                  <CalculatorIcon className="w-12 h-12 text-on-surface-variant opacity-30 mb-8" />
                  <h3 className="text-2xl font-bold text-on-surface-variant mb-4">Ready to Calculate?</h3>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
};