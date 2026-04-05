/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useInView, animate, useScroll, useTransform } from 'motion/react';
import { 
  Sun, 
  Moon,
  Menu,
  X,
  ArrowRightCircle, 
  ArrowUpRight, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  Leaf, 
  Wrench, 
  PiggyBank,
  MapPin,
  Phone,
  Mail,
  Globe,
  Instagram,
  Facebook,
  Linkedin,
  BatteryCharging,
  BarChart3,
  Zap,
  Calculator,
  Send,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const HERO_SLIDES = [
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLkfK0uy42DTcewncy2aWs54FwE4Ok-F61OmEQ_Aqq5FSaPfPL5nN_dyF_n9D5P8nrZfgim3dggl_gjntc_gwKRTJfWDgYSfQd6pHI_umIItFcwmOiB1zZjMV9c4Nyf5z57kTbANxFTITDhifSO9ByB4w6a9_xwlHno7XiPADWFtlC07_GMRLoM3LL9PHf0T7l3v-MIchbHgcYKmQ1gcpk3lQnf7wcCHhx5H6iKgV8pBaP1_izPHKZNuV2fr8zcnpW9qJD5dDLvSQa",
    title: "THE SUNSPARK SOLAR FLOW",
    highlight: "SOLAR FLOW",
    description: "Transition to a sustainable future with precision-engineered solar infrastructure that captures every photon of kinetic light energy."
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHn_fo7AD_h7kScwYa6ldcPcANYbqnGkBQWBWEjwU9zJNbVLd4ZiYY40ODjj3BABQm4ggUOnyi7mNzD85ZtqUy0a_o7ReHtwDqaNyBFW4fMJYR2YrASp_P3qgfLRWPMRdVL5fHnullI_SI1ZwDsO7g1of5C6RgZ-wzphXlifGTP299TZFNMt9tgWi14zeSlk9A72BSSFs9rXKknDA0KAwpSl4F7uiUvTqgfQMf71Vhct2U8RlG1ucOBy0drCz5Q7VyaB-2Fiau2dfa",
    title: "LUXURY POWERED BY SUN",
    highlight: "POWERED BY SUN",
    description: "Experience uncompromised elegance and energy independence with our premium solar integration solutions."
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_ibDQ_GNrr8j8aeefu0hqw_e3O9C6nxL1mpYYZUvPxiZnD4xFA-tSMHyfFhbKh35Ao71FWcdYUaNBNn_6tEzxmDIrJfoWf7mrln0QKbJxiCLJdWxZH2hrdhKo3a0QEtYkvJmKnk0OnHNaO14dB-7Udc0kq1r2OuQcUUTbx5jLbKuh-Bye9U_-i9fmkZuUn_CA4Tm-xyRKVD9oOLur31T2sqGlfvrfHLB_pGFReujPZWqdKqtWUXz_Mpm9FDI8D2IiI_qCPWz-do59",
    title: "FUTURE IS RENEWABLE",
    highlight: "IS RENEWABLE",
    description: "Join the kinetic revolution today. High-performance technology meets environmental stewardship."
  }
];

const SERVICES = [
  {
    title: "Solar & Wind Installation",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABQ3kz8C_sf5Z7HiCCyC8InLkcfoWvKTsHw_aIyG2dX2f1ORVIixbf-GANgzlhYp2TfF7ZHlQtTMSejKoXE_mvvzvkaKiQYsnvsOYpElofDM4jQWQ0oAou64SGlExmcMjjJKBq3bFrRZo_Corz3_xQlLOBdRVvfdMK9Kyj6D-YQqmE8H7XtX7Ckt5aRhMgAoi_v6B1Da7pl-KXXSQ_7VYsw1VGwyUlVkSvgGPPH-yFFnHT-7LczojegHtJoyCDDfJ7nxbjbZu6q4jk",
    description: "Comprehensive installation services for both solar arrays and wind turbines, optimized for maximum kinetic yield."
  },
  {
    title: "Energy Storage Systems",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCm-6k_El2nQfKVNEsnKkD0iK_VVStkHWvACGBakcFWUXk6GCJAgI13LX7Di-iYX_5_2yK9bO8YtEC0nPTQ4QiqbQO7dpVbH2HytGrLRwVyiAZynF8uDp_1y-tEGJrGI48FQ2D19MeAJN1cnyTqcnVwewWb3KKzgj1HOUJiypbfHVI3o2B8cCTt9nhrCvGTdC-H-rQ_N-CF_dQCxqnQXWnnCsAxnQZK_qBRnrgoftezcMz3piVrniGfLRbj-RMxG2fNyDLpcdD7QGsn",
    description: "High-density lithium-ion storage solutions that ensure your energy is available 24/7, regardless of weather conditions."
  },
  {
    title: "Repair & Maintenance",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgeC8e9VZhBwZokwJpG8y11LBhqAV9r0eRGJ5BZVgjcW-zrEUIzMIKkfMptlRllzK34cM6nuUS1UD1URaCnW87cM0AGk_qkOEKUh6XZg7y31IeudqyLVQZ9IPGH8Ods2nlgUFy4A2TA6JA18a0Zr-9zljCNWFhkaW03X50FrQIXBnFyzkz-52vj6noxxmLfXhinHVMasEP280iFRgrCs063IsjBH_Xb6U5Wn9bbJx8QfjkCKIlwWYfEtyLC5tlyUYgutjJd-3ITvL7",
    description: "Expert maintenance and rapid repair services to keep your sustainable infrastructure operating at peak efficiency."
  }
];

const TEAM = [
  {
    name: "Bilal Khan Kundi",
    role: "CEO",
    image:"/team/Bilal.jpg",
  },
  {
    name: "Marcus Thorne",
    role: "Lead System Engineer",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoMDF1iFGx1-PCiFoXuPxynxWjUZCdnUvpS732YrRvllS-Iuydg_SnrWtOxhTVmPqZMt6T0r3Ep84bG8SGvQ7Pl44zdLwDxduZZwafqJnhNj2sJiHS86ydHPqbVMW-HEa1k9Rw9gZif07le45J0F8ImzQ-Bi5RaHWcFA1Q26jB72gvCfmRjeHoZvUDg-UlHlHJXcwnRAF6PnI14W7XR42A-2JLU6zBRwWj2o2JJDZO5llteAOQlvCEImKOFTfV-_0aFihtTuOMvMHf"
  },
  {
    name: "Elena Rodriguez",
    role: "Sustainability Director",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4rH-L-Ji_gvHSrma9tdmPyUA5sklj1sIwEFLDMJ3H_kSkE2Fij6qPaRhZ7qCPpR2IzWEHAsOXjScAtg5Yr5ZaoOpSF28r3hCQR9-e5C_YGfYKBcUWk2VszwancUAAYqfDayxcUti2geki-cC-YhfRtNkqGXTe6x-RLKjOUOPbYhfZ8E003TdsnVPicWUofkJWSMaham5jrSd0YrpEurzwoLx42Yuv-XAQobVeOe9K4mFioU87lsEVBBvtDxo-l23SryHXPpz90xWc"
  },
  {
    name: "David Park",
    role: "Global Project Head",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhMQJq_k93NoRiltPz_1Fxw0BwBPVbtxnZTqUdSZRrJU6I1s1wwlHhAUpFwmSiKDIdmHttEejvMW6PKqu-sKAdbht9DbxXQ3-26HizqeiQHVb3qjlbjWz4HRlCKJ0fPFyqvWZ4Q7vwpJL6m9cYVfEBJ3hlc4IRkA_FIBURxriiH8xm-eX5bxs58ylqN8KQVGb5SV9QFunoWtlkXARAMbxhcy4OAuw2ptATuWqA3RGK3SWmMQAXQM0VQvMQJfXHCOsoEE9EZnWcFACC"
  }
];

const PROJECTS = [
  {
    title: "Embrace Solar Embrace Tomorrow",
    category: "Sun Pro Services",
    image: "https://picsum.photos/seed/solar-p1/1200/800",
    size: "large"
  },
  {
    title: "Embrace Solar Embrace Tomorrow",
    category: "Sun Pro Services",
    image: "https://picsum.photos/seed/solar-p2/1200/800",
    size: "large"
  },
  {
    title: "Embrace Solar Service",
    category: "Sun Pro Services",
    image: "https://picsum.photos/seed/solar-p3/800/600",
    size: "small"
  },
  {
    title: "Embrace Solar Embrace Tomorrow",
    category: "Sun Pro Services",
    image: "https://picsum.photos/seed/solar-p4/800/600",
    size: "small"
  },
  {
    title: "Embrace Solar Service",
    category: "Sun Pro Services",
    image: "https://picsum.photos/seed/solar-p5/800/600",
    size: "small"
  }
];

const PRODUCTS_DEAL = [
  {
    title: "Solar Inverter",
    image: "https://images.unsplash.com/photo-1624397648246-47ce3a0d0be1?auto=format&fit=crop&q=80&w=800",
    description: "High-efficiency power conversion systems for residential and commercial use."
  },
  {
    title: "Solar Panels",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800",
    description: "Tier 1 monocrystalline solar modules with industry-leading efficiency."
  },
  {
    title: "Lithium Batteries",
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800",
    description: "Advanced energy storage solutions for 24/7 power availability."
  },
  {
    title: "Solar Stand",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&q=80&w=800",
    description: "Durable mounting and tracking structures designed for maximum stability."
  },
  {
    title: "Solar DC Cables",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    description: "High-conductivity weather-resistant cabling for safe energy transmission."
  }
];

const BLOG_POSTS = [
  {
    category: "Innovation",
    title: "The Breakthrough in Photovoltaic Sensitivity",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaRpF3c-2KwAlmer_9Tg4qGIwlThxC24c9gg347HV5mURPLQbK-bfllBdUb7nWJZro2gHWXFvWWPEVjn8UM4W_uyXhB1l9yUA1g8UcbV0A_KNcLXzovOvFioCIxTz7fRunVR7PaL_iva3-nlArHMtOHhBp30YwrzLjzywGOMTSdKbmDy0FM9RD1HdE-fFOLfxq7AYiJ4445fjyHHC86kHR0-h7Y-uJlym6ZBy3Y4CFdm8rbp8XOxbP-2yV36jFSLFloPiG1qcRlqX0",
    excerpt: "Exploring the new molecular coatings that allow panels to harvest energy from ambient light."
  },
  {
    category: "Case Study",
    title: "How a Village Gained 100% Independence",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAT_cbRvTPgmW9UdtWtR1iLxBLvCpRxinzrNWcQ9_SwzNZZk4K1VUsXK7UsX8qXDNM8Vk5jPUOKB64amyv_CcxtFr0N3nFgTYM-rANrwNZj45xyMOO3bDpHfLwLyUPqH6_VEOm2jNQASJjBP6703gXwi4pRQwnWmLdUah-lr_iR7jyqDoEipnPkwmkE_bTn7UxPvn6NwwOTAh22JJLcaqqpYfU5SEn3HVJqIuh4cC1HPCGPDk6A06Tp-Qptxqn_7WYEUCyj7qzv7uma",
    excerpt: "A deep dive into the micro-grid integration of the Scandinavian Sol-Village project."
  },
  {
    category: "Technology",
    title: "AI & The Future of Energy Forecasting",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDooRRMwNMe6N8HGZpL_EoNsQyCV1BdlWOLHdiyvonXKQ0Dy0kCxoI62Qd4hZuDJMubN_-sMH4tHm6ElxZy1V03PW0V3qnGMlZ4nxpEKr5qS1xyF3ioJ0CEoCaiFseLLWQY2jrqRVyO71w03GKMPLEhZU4R9kvICu_Hd9UrFkm6YDfnBPDSIxosZhExrIR1cC8HOYFNJHNoUqo9g6heK1htuheX1v88cCX0K0APeNyaQ_YI1hd6lw02s4ypC3XjM8fWJ4MQEcxCQQc",
    excerpt: "How predictive modeling is eliminating the 'intermittency' problem of solar energy."
  }
];

const IMPACT_STATS = [
  { label: "kW Installed", value: 8500, suffix: "+" },
  { label: "Tons of CO2 Offset", value: 12400, suffix: "" },
  { label: "Happy Clients", value: 2500, suffix: "+" },
  { label: "Global Projects", value: 450, suffix: "" },
];

function Counter({ value, duration = 2, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const node = nodeRef.current;
      const controls = animate(0, value, {
        duration: duration,
        onUpdate(value) {
          node.textContent = Math.round(value).toLocaleString() + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, suffix, duration]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

function ProductDealsSection() {
  // Duplicate the products to create a seamless loop
  const duplicatedProducts = [...PRODUCTS_DEAL, ...PRODUCTS_DEAL];

  return (
    <section 
      id="products"
      aria-labelledby="products-deal-heading"
      className="relative py-16 md:py-24 bg-surface-container-lowest overflow-hidden border-b border-surface-container"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12 md:mb-16">
        <div className="text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
            <Zap className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          </div>
          <span className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-4 block">Premium Components</span>
          <h2 id="products-deal-heading" className="text-3xl md:text-5xl font-black tracking-tight text-on-surface uppercase">Products We Deal In</h2>
          <p className="text-on-surface-variant mt-2 md:mt-4 text-sm md:text-base">Discover our range of high-performance solar components.</p>
          <div className="w-16 md:w-24 h-1 md:h-1.5 bg-primary mx-auto mt-4 md:mt-6 rounded-full" />
        </div>
      </div>
      
      <div className="relative w-full" role="region" aria-label="Product carousel">
        <motion.div 
          className="flex gap-8 whitespace-nowrap"
          animate={{
            x: [0, -100 * PRODUCTS_DEAL.length - 32 * PRODUCTS_DEAL.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {duplicatedProducts.map((product, index) => (
            <div
              key={index}
              className="w-[300px] flex-shrink-0"
            >
              <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-lg border border-surface-container-high h-full flex flex-col items-center text-center group transition-all duration-500 hover:shadow-2xl hover:border-primary/20">
                <div className="relative w-full aspect-square mb-6 rounded-2xl overflow-hidden bg-surface-container-low flex items-center justify-center">
                  <div className="absolute top-3 left-3 z-10 bg-primary/90 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter shadow-lg">Premium</div>
                  <img 
                    src={product.image} 
                    alt="" 
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
        
        {/* Gradient Overlays for smooth fade out at edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface-container-lowest to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface-container-lowest to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}

function SolarSavingsCalculator() {
  const [bill, setBill] = useState<number>(150);
  const [roofSize, setRoofSize] = useState<number>(1000);
  const [location, setLocation] = useState('California');
  const [results, setResults] = useState<{ savings: number; payback: number; co2: number } | null>(null);

  const calculateSavings = () => {
    // Simplified calculation logic
    const annualConsumption = bill * 12 * 8; // Assuming $0.125 per kWh
    const solarPotential = roofSize * 15; // 15 kWh per sq ft per year
    const actualGeneration = Math.min(annualConsumption, solarPotential);
    
    const annualSavings = actualGeneration * 0.15; // $0.15 per kWh saved
    const systemCost = (actualGeneration / 1500) * 3000; // $3 per watt
    const payback = systemCost / annualSavings;
    const co2Offset = actualGeneration * 0.0007; // 0.7 kg CO2 per kWh

    setResults({
      savings: Math.round(annualSavings),
      payback: Number(payback.toFixed(1)),
      co2: Number(co2Offset.toFixed(1))
    });
  };

  return (
    <motion.section 
      aria-labelledby="calculator-heading"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-16 md:py-32 bg-surface-container-low rounded-[2rem] md:rounded-[4rem] my-10 md:my-20 shadow-xl border border-surface-container mx-4 md:mx-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Savings Estimator</span>
            <h2 id="calculator-heading" className="text-3xl md:text-5xl font-black tracking-tight mb-6 md:mb-8 leading-tight uppercase">HOW MUCH CAN YOU SAVE WITH <span className="text-primary">SUNSPARK?</span></h2>
            <p className="text-base md:text-lg text-on-surface-variant mb-8 md:mb-10 leading-relaxed">
              Use our kinetic energy calculator to estimate your potential savings, payback period, and environmental impact based on your specific property details.
            </p>
            
            <div className="space-y-6 bg-surface-container-lowest p-6 md:p-8 rounded-[2rem] md:rounded-3xl shadow-xl border border-outline-variant/10">
              <div>
                <label htmlFor="monthly-bill" className="block text-sm font-bold text-on-surface-variant mb-2 uppercase tracking-wide">Average Monthly Bill (RS)</label>
                <input 
                  id="monthly-bill"
                  type="range" 
                  min="5000" 
                  max="100000" 
                  step="500"
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
                  aria-valuemin={5000}
                  aria-valuemax={100000}
                  aria-valuenow={bill}
                />
                <div className="flex justify-between mt-2 font-bold text-primary" aria-hidden="true">
                  <span>5,000 RS</span>
                  <span className="text-2xl">{bill.toLocaleString()} RS</span>
                  <span>100,000 RS</span>
                </div>
              </div>

              <div>
                <label htmlFor="roof-area" className="block text-sm font-bold text-on-surface-variant mb-2 uppercase tracking-wide">Available Roof Area (sq ft)</label>
                <input 
                  id="roof-area"
                  type="number" 
                  value={roofSize}
                  onChange={(e) => setRoofSize(Number(e.target.value))}
                  className="w-full px-6 py-4 bg-surface-container rounded-xl border-none focus:ring-2 focus:ring-primary font-bold text-on-surface"
                  placeholder="e.g. 1000"
                />
              </div>

              <div>
                <label htmlFor="location-select" className="block text-sm font-bold text-on-surface-variant mb-2 uppercase tracking-wide">Your Location</label>
                <select 
                  id="location-select"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-6 py-4 bg-surface-container rounded-xl border-none focus:ring-2 focus:ring-primary font-bold text-on-surface"
                >
                  <option>California</option>
                  <option>Texas</option>
                  <option>Florida</option>
                  <option>New York</option>
                  <option>Arizona</option>
                </select>
              </div>

              <button 
                onClick={calculateSavings}
                className="w-full py-5 bg-primary text-white font-black rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3"
                aria-label="Calculate potential solar savings"
              >
                <Calculator className="w-6 h-6" aria-hidden="true" /> Calculate My Savings
              </button>
            </div>
          </div>

          <div className="relative" aria-live="polite">
            <AnimatePresence mode="wait">
              {results ? (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="grid grid-cols-1 gap-6"
                >
                  <div className="bg-primary text-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    <span className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-80 mb-2 block">Estimated Annual Savings</span>
                    <h3 className="text-4xl md:text-6xl font-black mb-4">{results.savings.toLocaleString()} RS</h3>
                    <p className="text-white/70 text-sm md:text-base">Based on current utility rates in {location}.</p>
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

                  <div className="bg-secondary text-white p-8 rounded-3xl shadow-xl flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xl">Kinetic Efficiency Peak</h5>
                      <p className="text-white/70 text-sm">Your property has high potential for kinetic solar harvesting.</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="aspect-square bg-surface-container rounded-[3rem] border-4 border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center p-12"
                >
                  <div className="w-24 h-24 bg-surface-container-highest rounded-full flex items-center justify-center mb-8">
                    <Calculator className="w-12 h-12 text-on-surface-variant opacity-30" />
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface-variant mb-4">Ready to Calculate?</h3>
                  <p className="text-on-surface-variant">Enter your details to see how much you could save with our premium solar solutions.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto" aria-labelledby="contact-heading">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Get In Touch</span>
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-black tracking-tight text-on-surface mb-8 uppercase">Let's Power Your <span className="text-primary">Future</span></h2>
          <p className="text-lg text-on-surface-variant mb-12 leading-relaxed">
            Have questions about our solar solutions? Our team of experts is ready to help you transition to clean, sustainable energy.
          </p>

          <div className="space-y-8">
            {[
              { icon: Phone, title: "Call Us", detail: "0344-2441880", sub: "Mon-Fri, 9am-6pm" },
              { icon: Mail, title: "Email Us", detail: "dik.sunspark@gmail.com", sub: "24/7 Support" },
              { icon: MapPin, title: "Visit Us", detail: "Head Office: Al-Rasheed Market Shop#10 DIK", sub: "Regional Office: Office #1-2, Mezzanine Floor, Rizwan Plaza, Jinnah Avenue, Blue Area, Islamabad" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-lg">{item.title}</h4>
                  <p className="text-on-surface-variant font-medium">{item.detail}</p>
                  <p className="text-xs text-on-surface-variant/60 uppercase tracking-widest mt-1">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-surface-container relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-on-surface-variant uppercase tracking-wide">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-6 py-4 bg-surface-container rounded-xl border-2 transition-all focus:ring-0",
                    errors.name ? "border-error/50 focus:border-error" : "border-transparent focus:border-primary"
                  )}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-error text-xs font-bold flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-on-surface-variant uppercase tracking-wide">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-6 py-4 bg-surface-container rounded-xl border-2 transition-all focus:ring-0",
                    errors.email ? "border-error/50 focus:border-error" : "border-transparent focus:border-primary"
                  )}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-error text-xs font-bold flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-bold text-on-surface-variant uppercase tracking-wide">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                className={cn(
                  "w-full px-6 py-4 bg-surface-container rounded-xl border-2 transition-all focus:ring-0",
                  errors.subject ? "border-error/50 focus:border-error" : "border-transparent focus:border-primary"
                )}
                placeholder="Inquiry about Residential Solar"
              />
              {errors.subject && <p className="text-error text-xs font-bold flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.subject}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold text-on-surface-variant uppercase tracking-wide">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className={cn(
                  "w-full px-6 py-4 bg-surface-container rounded-xl border-2 transition-all focus:ring-0 resize-none",
                  errors.message ? "border-error/50 focus:border-error" : "border-transparent focus:border-primary"
                )}
                placeholder="Tell us about your project..."
              />
              {errors.message && <p className="text-error text-xs font-bold flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full py-5 rounded-xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3",
                isSubmitting ? "bg-surface-container-highest text-on-surface-variant cursor-not-allowed" : "bg-primary text-white hover:opacity-90 active:scale-[0.98]"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6" /> Send Message
                </>
              )}
            </button>

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-3 text-primary"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-bold">Message sent successfully! We'll get back to you soon.</span>
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-error/10 border border-error/20 rounded-xl flex items-center gap-3 text-error"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-bold">Something went wrong. Please try again later.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 850], [0, 200]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full glass-header shadow-sm">
        <div className="flex justify-between items-center px-4 sm:px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-on-surface">SunSpark</span>
          </div>
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
            <a className="text-primary font-bold border-b-2 border-primary pb-1" href="#home">Home</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#about">About</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#services">Services</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#products">Products</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#projects">Projects</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#blog">Blog</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 sm:p-2.5 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="hidden sm:flex items-center gap-2 sm:gap-4">
              <a href="#contact" className="px-4 sm:px-6 py-2.5 bg-surface-container-high text-on-surface font-medium rounded-full hover:bg-surface-container-highest transition-all scale-95 active:scale-100 text-sm sm:text-base flex items-center justify-center" aria-label="Contact us">Contact</a>
              <button className="px-4 sm:px-6 py-2.5 bg-primary text-white font-bold rounded-full hover:opacity-90 transition-all scale-95 active:scale-100 shadow-lg shadow-primary/20 text-sm sm:text-base" aria-label="Get a solar quote">Get a Quote</button>
            </div>
            <button 
              className="lg:hidden p-2 text-on-surface"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-surface border-t border-surface-container overflow-hidden"
            >
              <nav className="flex flex-col p-6 space-y-4">
                {['Home', 'About', 'Services', 'Products', 'Projects', 'Blog'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-lg font-bold text-on-surface hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-4 flex flex-col gap-4">
                  <button className="w-full py-3 bg-surface-container-high text-on-surface font-bold rounded-xl">Contact Us</button>
                  <button className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20">Get a Quote</button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
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
              <motion.div 
                style={{ y: y1 }}
                className="absolute inset-0 scale-110"
              >
                <img 
                  className="absolute inset-0 w-full h-full object-cover" 
                  src={HERO_SLIDES[currentSlide].image} 
                  alt={HERO_SLIDES[currentSlide].title}
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 h-full flex items-center container max-w-7xl mx-auto px-4 sm:px-8">
                <div className="max-w-3xl">
                  <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-6 sm:mb-8 uppercase"
                  >
                    {HERO_SLIDES[currentSlide].title.split(HERO_SLIDES[currentSlide].highlight)[0]}
                    <br />
                    <span className="text-primary">{HERO_SLIDES[currentSlide].highlight}</span>
                  </motion.h1>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-12 max-w-xl leading-relaxed"
                  >
                    {HERO_SLIDES[currentSlide].description}
                  </motion.p>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap gap-3 sm:gap-4"
                  >
                    <button className="group relative px-6 sm:px-10 py-3 sm:py-5 bg-primary text-white text-base sm:text-lg font-bold rounded-full shadow-2xl shadow-primary/40 hover:scale-105 transition-all flex items-center gap-2 sm:gap-3 overflow-hidden" aria-label="Request a solar consultation">
                      <span className="relative z-10">Request a Consultation</span>
                      <ArrowRightCircle className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                    <button className="px-6 sm:px-10 py-3 sm:py-5 border-2 border-white text-white text-base sm:text-lg font-bold rounded-full hover:bg-white hover:text-on-surface transition-all" aria-label="Learn more about our technology">Learn More</button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20" role="tablist" aria-label="Hero slides">
            {HERO_SLIDES.map((_, index) => (
              <button 
                key={index}
                role="tab"
                aria-selected={currentSlide === index}
                aria-label={`Go to slide ${index + 1}`}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  currentSlide === index ? "bg-white w-8" : "bg-white/40"
                )}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>

        {/* About Section */}
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
                    {[
                      { title: "Tier 1 Monocrystalline Technology", desc: "We utilize only the highest-rated panels to ensure maximum energy yield and long-term durability in the Pakistani climate." },
                      { title: "Certified Architectural Integration", desc: "Our designs prioritize aesthetic harmony, ensuring that solar arrays complement the architectural integrity of your property." },
                      { title: "Proprietary AI-Driven Power Management", desc: "We provide advanced software that uses artificial intelligence to optimize power distribution and maximize your savings in real-time." },
                      { title: "Net Metering Expertise", desc: "Full end-to-end support for government-backed net metering applications to turn your excess energy into credit." },
                      { title: "24/7 Remote Monitoring", desc: "Constant surveillance of your system’s performance to ensure 100% uptime and immediate maintenance response." }
                    ].map((item, i) => (
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

        <ProductDealsSection />

        {/* Services Section */}
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
            {SERVICES.map((service, index) => (
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


        {/* Latest Projects Gallery Section */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
              {PROJECTS.filter(p => p.size === 'large').map((project, index) => (
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {PROJECTS.filter(p => p.size === 'small').map((project, index) => (
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


        {/* Team Section */}
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
              {TEAM.map((member, index) => (
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

        <SolarSavingsCalculator />

        <ContactSection />

        {/* Advantage Section */}
        <section className="py-16 md:py-32 bg-on-surface text-white rounded-t-[2rem] md:rounded-t-[4rem]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 uppercase">The SunSpark Advantage</h2>
            <p className="text-white/60 text-sm md:text-base">Why world-class organizations trust our premium solar technology.</p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
            {[
              { icon: ShieldCheck, title: "25 Year Warranty", desc: "Guaranteed performance for a quarter century of clean energy." },
              { icon: Leaf, title: "Eco-Precision", desc: "Materials sourced with zero-waste manufacturing protocols." },
              { icon: Wrench, title: "Expert Install", desc: "In-house engineering teams with master-level certifications." },
              { icon: PiggyBank, title: "ROI Focused", desc: "Designed to pay for itself within 5-7 years of operation." },
              { icon: Zap, title: "Smart Harvesting", desc: "Intelligent tracking systems that follow the sun's trajectory." },
              { icon: BarChart3, title: "Live Monitoring", desc: "Real-time data visualization of your energy production." }
            ].map((adv, i) => (
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

        {/* Pricing Section */}
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

        {/* Blog Section */}
        <section id="blog" className="py-16 md:py-32 px-4 sm:px-8 max-w-7xl mx-auto" aria-labelledby="blog-heading">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 md:mb-16">
            <div>
              <h2 id="blog-heading" className="text-3xl md:text-5xl font-black tracking-tight uppercase">SunSpark Insights</h2>
              <p className="text-on-surface-variant text-sm md:text-base">The latest in renewable tech and sustainability.</p>
            </div>
            <button className="text-primary font-bold flex items-center gap-2" aria-label="View all blog posts">View All Posts <ArrowUpRight className="w-5 h-5" aria-hidden="true" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {BLOG_POSTS.map((post, index) => (
              <article 
                key={index} 
                className="group cursor-pointer"
              >
                <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    src={post.image} 
                    alt="" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-primary text-xs font-bold uppercase tracking-widest">{post.category}</span>
                <h4 className="text-xl font-bold mt-2 mb-4 group-hover:text-primary transition-colors">{post.title}</h4>
                <p className="text-on-surface-variant text-sm line-clamp-2">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 px-4 sm:px-8 max-w-7xl mx-auto" aria-labelledby="cta-heading">
          <div className="energy-flow-gradient rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 text-center text-white relative overflow-hidden">
            <h2 id="cta-heading" className="text-3xl md:text-7xl font-black tracking-tight mb-6 md:mb-8 relative z-10 uppercase">READY TO HARVEST THE SUN?</h2>
            <p className="text-lg md:text-2xl text-white/80 mb-8 md:mb-12 max-w-3xl mx-auto relative z-10">Join over 5,000 forward-thinking households and businesses in the kinetic revolution.</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 relative z-10">
              <button className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white text-primary text-base md:text-lg font-black rounded-full shadow-2xl hover:scale-105 transition-transform" aria-label="Get a solar quote today">Get a Quote Today</button>
              <button className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-black/20 backdrop-blur-xl border border-white/20 text-white text-base md:text-lg font-black rounded-full hover:bg-white/10 transition-all" aria-label="Schedule a site survey">Schedule Survey</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low w-full rounded-t-[2rem]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12 px-6 sm:px-12 py-16 md:py-20 max-w-7xl mx-auto">
          <div className="sm:col-span-2 md:col-span-2">
            <span className="text-xl font-bold text-on-surface block mb-6">SunSpark</span>
            <p className="text-sm leading-relaxed text-on-surface-variant mb-8 max-w-xs">
              Pioneering the next generation of kinetic energy systems. We provide high-performance solar solutions for a cleaner tomorrow.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/sunsparkpower" },
                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/sunsparkpower" },
                { icon: Instagram, label: "Instagram", href: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  className="w-10 h-10 bg-surface-container-highest rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all" 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.label}`}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h6 className="font-bold mb-6 text-on-surface">Quick Links</h6>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><a className="hover:text-primary transition-transform inline-block" href="#about">About Us</a></li>
              <li><a className="hover:text-primary transition-transform inline-block" href="#projects">Our Projects</a></li>
              <li><a className="hover:text-primary transition-transform inline-block" href="#contact">Contact Us</a></li>
              <li><a className="hover:text-primary transition-transform inline-block" href="#blog">Latest News</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-6 text-on-surface">Services</h6>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><a className="hover:text-primary transition-transform inline-block" href="#">Residential Solar</a></li>
              <li><a className="hover:text-primary transition-transform inline-block" href="#">Commercial Farms</a></li>
              <li><a className="hover:text-primary transition-transform inline-block" href="#">EV Infrastructure</a></li>
              <li><a className="hover:text-primary transition-transform inline-block" href="#">Maintenance</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-6 text-on-surface">Contact Info</h6>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span>Head Office: Al-Rasheed Market Shop#10 DIK</span>
                  <span className="text-xs opacity-70">Regional Office: Office #1-2, Mezzanine Floor, Rizwan Plaza, Jinnah Avenue, Blue Area, Islamabad</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>0344-2441880</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>dik.sunspark@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-surface-container py-8 px-12 text-center">
          <p className="text-sm text-on-surface-variant">© 2024 SunSpark. Clean Energy for a Sustainable Future.</p>
        </div>
      </footer>
    </div>
  );
}
