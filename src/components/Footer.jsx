import React from 'react';
import { Globe } from 'lucide-react';
import * as Brands from '@icons-pack/react-simple-icons';

// Safe extraction to prevent "Missing Export" crashes
const FacebookIcon = Brands.SiFacebook || Globe;
const InstagramIcon = Brands.SiInstagram || Globe;
const LinkedinIcon = Brands.SiLinkedin || Globe;

export const Footer = () => {
  return (
    <footer className="bg-surface-container-low w-full rounded-t-[3rem] md:rounded-t-[5rem] mt-20">
      <div className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-5 gap-12 lg:gap-20">
        <div className="md:col-span-2">
          <span className="text-3xl font-black tracking-tighter text-on-surface block mb-8">SunSpark</span>
          <p className="text-on-surface-variant leading-relaxed mb-8 max-w-sm font-medium">
            Pioneering the next generation of kinetic energy systems. Clean energy for a sustainable tomorrow.
          </p>
          <div className="flex gap-5">
            {[
              { icon: FacebookIcon, label: "Facebook", href: "https://facebook.com/sunsparkpower" },
              { icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com/company/sunsparkpower" },
              { icon: InstagramIcon, label: "Instagram", href: "#" }
            ].map((social, i) => (
              <a 
                key={i} 
                className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm border border-surface-container group" 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-on-surface-variant group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="pt-2">
          <h6 className="font-bold mb-8 uppercase tracking-widest text-xs text-on-surface">Solutions</h6>
          <ul className="space-y-4 text-sm font-medium text-on-surface-variant">
            <li><a href="#home" className="hover:text-primary transition-colors">Residential Flow</a></li>
            <li><a href="#services" className="hover:text-primary transition-colors">Commercial Scale</a></li>
            <li><a href="#products" className="hover:text-primary transition-colors">Battery Storage</a></li>
          </ul>
        </div>
        
        <div className="pt-2">
          <h6 className="font-bold mb-8 uppercase tracking-widest text-xs text-on-surface">Company</h6>
          <ul className="space-y-4 text-sm font-medium text-on-surface-variant">
            <li><a href="#about" className="hover:text-primary transition-colors">Our Vision</a></li>
            <li><a href="#projects" className="hover:text-primary transition-colors">Latest Projects</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>
        
        <div className="pt-2">
          <h6 className="font-bold mb-8 uppercase tracking-widest text-xs text-on-surface">Locate Us</h6>
          <div className="space-y-6 text-sm font-medium text-on-surface-variant">
            <p>Head Office: <br />Al-Rasheed Market Shop#10 DIK</p>
            <p>Regional Office: <br />Jinnah Avenue, Blue Area, Islamabad</p>
          </div>
        </div>
      </div>
      
      <div className="py-10 border-t border-surface-container text-center text-[10px] font-bold uppercase tracking-widest opacity-40 text-on-surface-variant">
        © {new Date().getFullYear()} SunSpark Kinetic Systems. Engineered for Excellence.
      </div>
    </footer>
  );
};