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
    <footer className="bg-[#1a3a4a] text-white">
      {/* Main Footer - Increased vertical padding and column gaps */}
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
                <Leaf className="text-[var(--premium-gold)]" size={22} />
              </div>
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-white tracking-wide">
                  ANNAPURNANAND
                </span>
                <span className="text-[10px] text-white/70 tracking-widest uppercase">
                  A HerbalGold Riverbelt Initiative
                </span>
              </div>
            </Link>
            <p className="text-white/85 text-sm leading-relaxed mb-6">
              Pure plant-based nutrition from the Godavari Riverbelt. Farmer-grown, science-backed, formulated by Dr. Mohini Zate.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--premium-gold)] hover:text-[var(--text-primary)] transition-all" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--premium-gold)] hover:text-[var(--text-primary)] transition-all" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--premium-gold)] hover:text-[var(--text-primary)] transition-all" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer md:cursor-default"
              onClick={() => toggleSection('quick-links')}
            >
              <h4 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-5 md:mb-6 text-[var(--premium-gold)] tracking-wide">
                Quick Links
              </h4>
              <ChevronDown 
                size={20} 
                className={cn("md:hidden transition-transform duration-300 mb-5 text-white/70", openSection === 'quick-links' ? 'rotate-180' : '')} 
              />
            </div>
            <ul className={cn("space-y-1 overflow-hidden transition-all duration-300", 
              openSection === 'quick-links' ? 'max-h-60' : 'max-h-0 md:max-h-none'
            )}>
              {[
                { label: 'Shop All', href: '/shop' },
                { label: 'Our Story', href: '/about' },
                { label: 'The Riverbelt', href: '/riverbelt' },
                { label: 'Blog', href: '/blog' },
                { label: 'FAQs', href: '/faq' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white hover:pl-2 transition-all text-sm block py-2 min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer md:cursor-default"
              onClick={() => toggleSection('products')}
            >
              <h4 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-5 md:mb-6 text-[var(--premium-gold)] tracking-wide">
                Our Products
              </h4>
              <ChevronDown 
                size={20} 
                className={cn("md:hidden transition-transform duration-300 mb-5 text-white/70", openSection === 'products' ? 'rotate-180' : '')} 
              />
            </div>
            <ul className={cn("space-y-1 overflow-hidden transition-all duration-300", 
              openSection === 'products' ? 'max-h-60' : 'max-h-0 md:max-h-none'
            )}>
              {['Health Drinks', 'Smoothie Mixes', 'Nutrition Powders', 'Capsules & Tablets', 'Digestive Care'].map((link) => (
                <li key={link}>
                  <Link
                    href="/shop"
                    className="text-white/70 hover:text-white hover:pl-2 transition-all text-sm block py-2 min-h-[44px] flex items-center"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer md:cursor-default"
              onClick={() => toggleSection('contact')}
            >
              <h4 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-5 md:mb-6 text-[var(--premium-gold)] tracking-wide">
                Contact Us
              </h4>
              <ChevronDown 
                size={20} 
                className={cn("md:hidden transition-transform duration-300 mb-5 text-white/70", openSection === 'contact' ? 'rotate-180' : '')} 
              />
            </div>
            <div className={cn("overflow-hidden transition-all duration-300", 
              openSection === 'contact' ? 'max-h-96' : 'max-h-0 md:max-h-none'
            )}>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-white/85">
                  <MapPin size={18} className="mt-0.5 flex-shrink-0 text-[var(--premium-gold)]" />
                  <span>Godavari Riverbelt Region,<br />Maharashtra, India</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/85">
                  <Mail size={18} className="flex-shrink-0 text-[var(--premium-gold)]" />
                  <a href="mailto:care@annapurnanand.com" className="hover:text-white transition-colors">
                    care@annapurnanand.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/85">
                  <Phone size={18} className="flex-shrink-0 text-[var(--premium-gold)]" />
                  <span>+91 XXXX XXXXXX</span>
                </li>
              </ul>

              {/* Newsletter - Differentiated from main CTA */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h5 className="text-sm font-semibold mb-1 text-white">Product Updates</h5>
                <p className="text-xs text-white/60 mb-3">Get early access to new formulations & offers.</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-sm placeholder:text-white/50 focus:outline-none focus:border-[var(--premium-gold)] min-h-[44px]"
                  />
                  <Button size="md" className="bg-[var(--premium-gold)] text-[var(--text-primary)] hover:bg-[var(--premium-gold-light)] border-none whitespace-nowrap">
                    Join
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Better disclaimer formatting */}
      <div className="border-t border-white/15 bg-[#152f3c]">
        <div className="container mx-auto px-4 py-8">
          {/* Elegant Disclaimer - Improved formatting */}
          <div className="max-w-2xl mx-auto text-center mb-6">
            <p className="text-[11px] uppercase tracking-widest text-white/50 mb-2">Disclaimer</p>
            <p className="text-white/60 text-xs leading-relaxed">
              Our products are food supplements made from natural ingredients. 
              They are not intended to diagnose, treat, cure, or prevent any disease. 
              Please consult a healthcare professional before use if you have any medical conditions or are pregnant/nursing.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/70 pt-4 border-t border-white/10">
            <p>© {currentYear} Annapurnanand HerbalGold. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-white/50">FSSAI: XXXXXXXXXX</span>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
