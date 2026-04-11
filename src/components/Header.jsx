import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

export const Header = ({ darkMode, setDarkMode }) => {
  // We moved this state inside the Header since App doesn't need to know if the menu is open!
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-header shadow-sm border-b border-surface-container/30">
      <div className="flex justify-between items-center px-4 sm:px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-black tracking-tighter text-on-surface">SunSpark</span>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-8">
          {['Home', 'About', 'Services', 'Products', 'Projects', 'Blog'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-on-surface-variant hover:text-primary transition-colors font-medium">
              {item}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-2 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          {/* UPDATED: Get a Quote button is now a WhatsApp link */}
          <a 
            href="https://wa.me/923442441880?text=Hi!%20I%20am%20interested%20in%20SunSpark%20Solar%20Solutions.%20Can%20I%20get%20a%20quote?"
            target="_blank"
            rel="noopener noreferrer"
className="hidden sm:block px-6 py-2.5 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-105 hover:-translate-y-1 hover:shadow-primary/50 transition-all duration-300"          >
            Get a Quote
          </a>
          
          <button className="lg:hidden p-2 text-on-surface" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
};