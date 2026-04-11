import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { CheckCircle2, ArrowRightCircle } from 'lucide-react';

// We moved the Counter here since it belongs to this section!
function Counter({ value, duration = 2, suffix = "" }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const node = nodeRef.current;
      const controls = animate(0, value, {
        duration: duration,
        onUpdate(v) {
          node.textContent = Math.round(v).toLocaleString() + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, suffix, duration]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

export const About = () => {
  const standards = [
    { title: "Tier 1 Monocrystalline Technology", desc: "We utilize only the highest-rated panels to ensure maximum energy yield and long-term durability in the Pakistani climate." },
    { title: "Certified Architectural Integration", desc: "Our designs prioritize aesthetic harmony, ensuring that solar arrays complement the architectural integrity of your property." },
    { title: "Proprietary AI-Driven Power Management", desc: "We provide advanced software that uses artificial intelligence to optimize power distribution and maximize your savings in real-time." },
    { title: "Net Metering Expertise", desc: "Full end-to-end support for government-backed net metering applications to turn your excess energy into credit." },
    { title: "24/7 Remote Monitoring", desc: "Constant surveillance of your system’s performance to ensure 100% uptime and immediate maintenance response." }
  ];

  return (
    <motion.section 
      id="about"
      aria-labelledby="about-heading"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-16 md:py-32 bg-surface-container-low overflow-hidden rounded-[2rem] md:rounded-[4rem] my-10 md:my-20 shadow-2xl shadow-surface-container border border-surface-container/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          
          {/* Left Column: Image and Counter */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col lg:sticky lg:top-32"
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">About SunSpark Solar Solutions</span>
            <h2 id="about-heading" className="text-4xl font-black tracking-tight mb-8 text-on-surface uppercase leading-tight">
              About SunSpark Solar Solutions
            </h2>
            
            <div className="relative mb-10">
              <div className="relative z-10 rounded-[3rem] overflow-hidden aspect-video shadow-2xl">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjrOwoH9lw7s89hNA6Q4rqdmrK30CzDQGcw7koNGassuyvkILpUBS1Z6JznZVCZQknxlM1oxrVr-aQqlnfOQ6mVwcfSiTZotT3z4hIiQyuRX45YsiqBX4dk8wRSUI5j4Je9L6Z5L39n_8KlzoRUI-993rZx8X074_XPvruhaisNakyQY1ZTcwx7mrQ01Rsn9oT4eVA9WwjYPMljiqa0-sb-KwHc1xYRTmSzQyXe_DwgzVSWqq2Z9LJV_TQWimxFIv6UzN9rdlIyjMs" 
                  alt="Solar engineer inspecting a kinetic solar array in a field"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-container rounded-3xl -z-10 animate-pulse opacity-20" aria-hidden="true" />
              
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 p-4 md:p-6 glass-header rounded-2xl shadow-xl z-20"
              >
                <p className="text-2xl md:text-3xl font-black text-primary">
                  <Counter value={15} suffix="+" />
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Years of Innovation</p>
              </motion.div>
            </div>

            <div className="mt-auto">
              <button className="px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:scale-105 transition-all flex items-center gap-2">
                Discover Our Mission <ArrowRightCircle className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Text and Standards List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pt-12"
          >
            <div className="space-y-6 mb-12 border-l-4 border-primary/20 pl-6">
              <p className="text-lg text-on-surface-variant leading-relaxed">
                SunSpark Solar Solutions is recognized as one of the premier solar solution providers in Pakistan, powered by an elite team of electrical engineers and certified PV installation specialists.
              </p>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                We go beyond simple installation; our dedicated Energy Technology experts work alongside seasoned financial consultants to provide integrated technical and financial feasibility studies. This ensures every project is not only viable but optimized for maximum ROI.
              </p>
              <p className="text-lg text-on-surface-variant leading-relaxed font-bold text-on-surface">
                With SunSpark, you receive tailored, reliable advice designed to match your specific energy requirements with the most efficient solar technology available.
              </p>
            </div>
            
            <div className="bg-surface-container-lowest p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-surface-container border border-surface-container">
              <h3 className="text-lg md:text-xl font-bold text-on-surface mb-6 md:mb-8 uppercase tracking-tight flex items-center gap-3">
                <div className="w-8 h-1 bg-primary rounded-full" />
                Our Industry-Leading Standards
              </h3>
              
              <ul className="space-y-8">
                {standards.map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="flex items-start gap-5 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-bold block text-on-surface text-lg mb-1">{item.title}</span>
                      <span className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
          
        </div>
      </div>
    </motion.section>
  );
};