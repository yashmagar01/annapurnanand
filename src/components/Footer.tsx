'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Youtube, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-gradient-to-b from-[var(--riverbelt-blue-900)] to-[#020609] text-white relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--premium-gold) 1px, transparent 0)', backgroundSize: '32px 32px' }}>
      </div>
      
      {/* Top Border Gradient */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[var(--premium-gold-dark)] to-transparent opacity-30"></div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column (Col Span 4) */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center group-hover:border-[var(--premium-gold)]/30 transition-all duration-500">
                  <Leaf className="text-[var(--premium-gold)] transition-transform duration-500 group-hover:scale-110" size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white tracking-wide">
                    ANNAPURNANAND
                  </span>
                  <span className="text-[10px] text-[var(--premium-gold)] tracking-[0.2em] uppercase font-medium mt-1">
                    HerbalGold Riverbelt FPC
                  </span>
                </div>
              </div>
            </Link>
            
            <p className="text-white/70 text-base leading-relaxed max-w-sm">
              Cultivating wellness from the nutrient-rich soils of the Godavari Riverbelt. 
              Our commitment bridges ancient Ayurvedic wisdom with modern scientific validation.
            </p>
            
            <div className="flex gap-4 pt-2">
              {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Youtube, label: "Youtube" }
              ].map(({ icon: Icon, label }) => (
                  <a 
                    key={label}
                    href="#" 
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[var(--premium-gold)] hover:border-[var(--premium-gold)] hover:text-[var(--riverbelt-blue-900)] transition-all duration-300 group" 
                    aria-label={label}
                  >
                    <Icon size={18} className="transition-transform group-hover:scale-110" />
                  </a>
              ))}
            </div>
          </div>

          {/* Spacer on Desktop */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links Section (Col Span 7 - Split into 3 columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            
            {/* Quick Links */}
            <div>
               <div 
                className="flex items-center justify-between cursor-pointer md:cursor-default group"
                onClick={() => toggleSection('quick-links')}
              >
                <h4 className="font-[family-name:var(--font-heading)] text-lg text-[var(--premium-gold)] mb-6 tracking-wide relative inline-block">
                   Quick Links
                   <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-[var(--premium-gold)]/50 rounded-full md:block hidden"></span>
                </h4>
                <ChevronDown 
                  size={18} 
                  className={cn("md:hidden transition-transform duration-300 text-[var(--premium-gold)]", openSection === 'quick-links' ? 'rotate-180' : '')} 
                />
              </div>
              <ul className={cn("space-y-3 overflow-hidden transition-all duration-300", 
                 openSection === 'quick-links' ? 'max-h-60 mt-2' : 'max-h-0 md:max-h-none'
               )}>
                {[
                  { label: 'Shop All', href: '/shop' },
                  { label: 'Our Story', href: '/about' },
                  { label: 'The Riverbelt', href: '/riverbelt' },
                  { label: 'Journal', href: '/blog' },
                  { label: 'FAQs', href: '/faq' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm block py-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collections */}
            <div>
               <div 
                className="flex items-center justify-between cursor-pointer md:cursor-default group"
                onClick={() => toggleSection('products')}
              >
                <h4 className="font-[family-name:var(--font-heading)] text-lg text-[var(--premium-gold)] mb-6 tracking-wide relative inline-block">
                   Collections
                   <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-[var(--premium-gold)]/50 rounded-full md:block hidden"></span>
                </h4>
                <ChevronDown 
                  size={18} 
                  className={cn("md:hidden transition-transform duration-300 text-[var(--premium-gold)]", openSection === 'products' ? 'rotate-180' : '')} 
                />
              </div>
              <ul className={cn("space-y-3 overflow-hidden transition-all duration-300", 
                 openSection === 'products' ? 'max-h-60 mt-2' : 'max-h-0 md:max-h-none'
               )}>
                 {['Health Drinks', 'Smoothie Mixes', 'Superfood Powders', 'Herbal Capsules', 'Digestive Care'].map((link) => (
                  <li key={link}>
                    <Link
                      href="/shop"
                      className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm block py-1"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Contact */}
            <div>
               <div 
                className="flex items-center justify-between cursor-pointer md:cursor-default group"
                onClick={() => toggleSection('contact')}
              >
                <h4 className="font-[family-name:var(--font-heading)] text-lg text-[var(--premium-gold)] mb-6 tracking-wide relative inline-block">
                   Stay Connected
                   <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-[var(--premium-gold)]/50 rounded-full md:block hidden"></span>
                </h4>
                <ChevronDown 
                  size={18} 
                  className={cn("md:hidden transition-transform duration-300 text-[var(--premium-gold)]", openSection === 'contact' ? 'rotate-180' : '')} 
                />
              </div>
              
              <div className={cn("overflow-hidden transition-all duration-300", 
                 openSection === 'contact' ? 'max-h-96 mt-2' : 'max-h-0 md:max-h-none'
               )}>
                <div className="space-y-6">
                  {/* Contact Info */}
                  <ul className="space-y-4">
                     <li className="flex items-start gap-3 group">
                        <MapPin size={18} className="mt-1 text-[var(--premium-gold)] opacity-70 group-hover:opacity-100 transition-opacity" />
                        <span className="text-sm text-white/60 leading-relaxed font-light">
                           Godavari Riverbelt Region,<br/>Maharashtra, India
                        </span>
                     </li>
                     <li className="flex items-center gap-3 group">
                        <Mail size={18} className="text-[var(--premium-gold)] opacity-70 group-hover:opacity-100 transition-opacity" />
                        <a href="mailto:care@annapurnanand.com" className="text-sm text-white/60 hover:text-white transition-colors">
                           care@annapurnanand.com
                        </a>
                     </li>
                  </ul>

                  {/* Newsletter Input */}
                  <div className="pt-2">
                     <p className="text-xs text-white/50 mb-3 uppercase tracking-wider font-medium">Join our community</p>
                     <div className="relative">
                        <input
                           type="email"
                           placeholder="Email Address"
                           className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--premium-gold)] focus:ring-1 focus:ring-[var(--premium-gold)]/20 transition-all"
                        />
                        <button className="absolute right-1 top-1 bottom-1 px-3 bg-[var(--premium-gold)] text-[var(--riverbelt-blue-900)] text-xs font-bold uppercase rounded-md hover:bg-[#E5C85C] transition-colors tracking-wide">
                           Join
                        </button>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/5 relative z-10">
         <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-6">
               {/* Disclaimer */}
               <div className="max-w-4xl mx-auto text-center">
                  <p className="text-[10px] text-white/30 leading-normal font-light">
                     DISCLAIMER: The products and information found on this website are not intended to replace professional medical advice or treatment. 
                     These statements have not been evaluated by the Food and Safety Standards Authority of India (FSSAI). 
                     Our dietary supplements are not intended to diagnose, treat, cure or prevent any disease or medical condition. 
                     Individual results may vary.
                  </p>
               </div>
               
               {/* Links & Copyright */}
               <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 font-light border-t border-white/5 pt-6 mt-2">
                  <p>&copy; {currentYear} Annapurnanand HerbalGold. All rights reserved.</p>
                  <div className="flex items-center gap-6">
                     <span className="hover:text-white/60 transition-colors cursor-pointer">Privacy Policy</span>
                     <span className="w-1 h-1 rounded-full bg-white/20"></span>
                     <span className="hover:text-white/60 transition-colors cursor-pointer">Terms of Service</span>
                     <span className="w-1 h-1 rounded-full bg-white/20"></span>
                     <span className="hover:text-white/60 transition-colors cursor-pointer">Shipping Policy</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </footer>
  );
}
