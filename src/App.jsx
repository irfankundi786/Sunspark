/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

// --- Component Imports ---
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { About } from './components/About.jsx';
import { Products } from './components/Products.jsx';
import { Services } from './components/Services.jsx';
import { Projects } from './components/Projects.jsx';
import { Team } from './components/Team.jsx';
import { Calculator } from './components/Calculator.jsx';
import { Contact } from './components/Contact.jsx';
import { Pricing } from './components/Pricing.jsx';
import { Advantage } from './components/Advantage.jsx';
import { Blog } from './components/Blog.jsx';
import { Cta } from './components/Cta.jsx';
import { Footer } from './components/Footer.jsx';

// --- Data Constants ---
// (In a real project, you might even move these into a src/data/content.js file!)
const HERO_SLIDES = [
  {
    image: "/hero/hero1.png",
    title: "THE SUNSPARK SOLAR FLOW",
    highlight: "SOLAR FLOW",
    description: "Transition to a sustainable future with SunSpark Solar Solutions. Our precision-engineered infrastructure captures every photon to maximize your energy potential."
  },
  {
    image: "/hero/hero2.png",
    title: "LUXURY POWERED BY SUN",
    highlight: "POWERED BY SUN",
    description: "Experience uncompromised elegance and true energy independence with SunSpark's premium residential solar integration."
  },
  {
    image: "/hero/hero3.png",
    title: "FUTURE IS RENEWABLE",
    highlight: "IS RENEWABLE",
    description: "Join the clean energy revolution with SunSpark Solar Solutions. Where high-performance technology meets environmental stewardship for a brighter tomorrow."
  },
  {
    image: "/hero/hero4.png",
    title: "SMART ENERGY FOR MODERN LIVING",
    highlight: "MODERN LIVING",
    description: "Empower your property with SunSpark's intelligent solar systems. Seamlessly integrate renewable, cost-saving energy into your modern lifestyle."
  },
  {
    image: "/hero/hero5.png",
    title: "CLEAN ENERGY FOR A SUSTAINABLE FUTURE",
    highlight: "SUSTAINABLE FUTURE",
    description: "Trust SunSpark Solar Solutions to lead your transition to net-zero. We deliver reliable, clean power designed to protect the planet and your investment."
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
    role: "CEO/Owner of SunSpark Solar Solutions",
    image: "/team/team1.png",
  },
  {
    name: "Engineer Ali",
    role: "Lead System Engineer",
    image: "/team/team2.png"
  },
  {
    name: "Junaid Khan And Akbar Ali",
    role: "Installation & Maintenance Specialists",
    image: "/team/team3.png"
  },
  {
    name: "Sara Ambar Khan",
    role: "Helpdesk & Customer Support",
    image: "/team/team4.png"
  }
];

const PROJECTS = [
  {
    title: "7 KW Residential Solar Installation",
    category: "Sun Pro Services",
    image: "/projects/project1.png",
    size: "large"
  },
  {
    title: "5 KW Residential Solar Installation",
    category: "Sun Pro Services",
    image: "/projects/project2.png",
    size: "large"
  },
  {
    title: "5.5 KW Residential Solar Installation",
    category: "Sun Pro Services",
    image: "/projects/project3.png",
    size: "small"
  },
  {
    title: "7 KW Residential Solar Installation",
    category: "Sun Pro Services",
    image: "/projects/project4.png",
    size: "small"
  },
  {
    title: "6KW Itel Inverter Installation",
    category: "Sun Pro Services",
    image: "/projects/project5.png",
    size: "small"
  }
];

const PRODUCTS_DEAL = [
  {
    title: "Solar Inverter",
    image: "/products/product1.png",
    description: "High-efficiency power conversion systems for residential and commercial use."
  },
  {
    title: "Solar Panels",
    image: "/products/product2.png",
    description: "Tier 1 monocrystalline solar modules with industry-leading efficiency."
  },
  {
    title: "Lithium Batteries",
    image: "/products/product3.png",
    description: "Advanced energy storage solutions for 24/7 power availability."
  }
 ,
  {
    title: "Solar Stand",
    image: "/products/product4.png",
    description: "Durable mounting and tracking structures designed for maximum stability."
  },
  {
    title: "Solar DC Cables",
    image: "/products/product5.png",
    description: "High-conductivity weather-resistant cabling for safe energy transmission."
  },
  {
    title: "Solar DC Circuits Breakers",
    image: "/products/product6.png",
    description: "Reliable circuit protection ensuring safe, uninterrupted solar energy flow.."
  },
  {
  title: "SECO G.M Infrared Cooker",
  image: "/products/product7.png", // Update this to match your actual image file name
  description: "High-efficiency infrared electric stove for fast, safe, and precise modern cooking."
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


export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-300">
      
      {/* 1. Passed props to Header */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main>
        <Hero slides={HERO_SLIDES} />
        <About />
        <Products products={PRODUCTS_DEAL} />
        <Services services={SERVICES} />
        <Projects projects={PROJECTS} />
        <Team team={TEAM} />
        <Calculator />
        <Contact />
        <Pricing />
        <Advantage />
        <Blog posts={BLOG_POSTS} />
        <Cta />
      </main>
      
      <Footer />
    </div>
  );
}