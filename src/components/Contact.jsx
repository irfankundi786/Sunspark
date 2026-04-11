import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Loader2, Globe } from 'lucide-react';
import * as Brands from '@icons-pack/react-simple-icons';

// Safe extraction to prevent "Missing Export" crashes
const FacebookIcon = Brands.SiFacebook || Globe;
const InstagramIcon = Brands.SiInstagram || Globe;
const LinkedinIcon = Brands.SiLinkedin || Globe;

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle'); 
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "2fb5f87e-516c-4f72-aca5-79ce9c0f432d",
          ...formData
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface mb-8 uppercase">
            Let's Power Your <span className="text-primary">Future</span>
          </h2>
          <div className="space-y-8">
            {[
              { icon: Phone, title: "Call Us", detail: "0344-2441880 , 0316 0099365", sub: "Mon-Fri, 9am-6pm" },
              { icon: Mail, title: "Email Us", detail: "dik.sunspark@gmail.com", sub: "24/7 Support" },
              { icon: MapPin, title: "Visit Us", detail: "Al-Rasheed Market Shop#10 DIK", sub: "Regional: Blue Area, Islamabad" },
              // Items with a 'link' property will become clickable
              { icon: FacebookIcon, title: "Facebook", detail: "SunSpark Solar Solutions", sub: "Follow our page", link: "https://facebook.com/sunsparkpower" },
              { icon: LinkedinIcon, title: "LinkedIn", detail: "SunSpark Solar", link: "https://linkedin.com/company/sunsparkpower" },
            ].map((item, i) => {
              
              // Common content shared between both versions
              const content = (
                <>
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-lg">{item.title}</h4>
                    <p className="text-on-surface-variant font-medium">{item.detail}</p>
                  </div>
                </>
              );

              // If it has a link, render an <a> tag
              if (item.link) {
                return (
                  <a 
                    key={i} 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-6 group cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    {content}
                  </a>
                );
              }

              // Otherwise, render a standard <div>
              return (
                <div key={i} className="flex items-start gap-6 group">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 md:p-12 bg-white rounded-[2.5rem] shadow-2xl border space-y-6 relative overflow-hidden">
          <input 
            placeholder="Full Name" 
            value={formData.name}
            className="w-full p-5 bg-surface-container rounded-2xl outline-none border-2 border-transparent focus:border-primary transition-all font-medium text-black" 
            required 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email"
            placeholder="Your email address" 
            value={formData.email}
            className="w-full p-5 bg-surface-container rounded-2xl outline-none border-2 border-transparent focus:border-primary transition-all font-medium text-black" 
            required 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <textarea 
            placeholder="Tell us about your project..." 
            rows={4} 
            value={formData.message}
            className="w-full p-5 bg-surface-container rounded-2xl outline-none border-2 border-transparent focus:border-primary transition-all font-medium resize-none text-black" 
            required 
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
          <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-primary text-white font-black text-lg rounded-2xl shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
            {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send /> SEND MESSAGE</>}
          </button>
          
          {submitStatus === 'success' && <p className="text-green-500 font-bold text-center mt-2">Message Sent Successfully!</p>}
          {submitStatus === 'error' && <p className="text-red-500 font-bold text-center mt-2">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </section>
  );
};