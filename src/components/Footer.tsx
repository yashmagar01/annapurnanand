import Link from 'next/link';
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--riverbelt-blue)] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Leaf className="text-[var(--premium-gold)]" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-white">
                  ANNAPURNANAND
                </span>
                <span className="text-[10px] text-white/60 tracking-widest uppercase">
                  A HerbalGold Riverbelt Initiative
                </span>
              </div>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Pure plant-based nutrition from the Godavari Riverbelt. Farmer-grown, science-backed, formulated by Dr. Mohini Zate.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--premium-gold)] hover:text-[var(--text-primary)] transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--premium-gold)] hover:text-[var(--text-primary)] transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--premium-gold)] hover:text-[var(--text-primary)] transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold mb-4 text-[var(--premium-gold)]">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Shop All', 'Our Story', 'The Riverbelt', 'Blog', 'FAQs'].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-white/80 hover:text-white hover:pl-2 transition-all text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold mb-4 text-[var(--premium-gold)]">
              Our Products
            </h4>
            <ul className="space-y-2">
              {['Health Drinks', 'Smoothie Mixes', 'Nutrition Powders', 'Capsules & Tablets', 'Digestive Care'].map((link) => (
                <li key={link}>
                  <Link
                    href="/shop"
                    className="text-white/80 hover:text-white hover:pl-2 transition-all text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold mb-4 text-[var(--premium-gold)]">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/80">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>Godavari Riverbelt Region,<br />Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:care@annapurnanand.com" className="hover:text-white transition-colors">
                  care@annapurnanand.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <Phone size={18} className="flex-shrink-0" />
                <span>+91 XXXX XXXXXX</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-2">Stay Updated</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm placeholder:text-white/50 focus:outline-none focus:border-[var(--premium-gold)]"
                />
                <button className="px-4 py-2 bg-[var(--premium-gold)] text-[var(--text-primary)] rounded-lg font-semibold text-sm hover:bg-[var(--premium-gold-light)] transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          {/* Elegant Disclaimer */}
          <p className="text-center text-white/50 text-xs max-w-3xl mx-auto mb-4 leading-relaxed">
            <strong className="text-white/70">Disclaimer:</strong> Our products are food supplements made from natural ingredients. 
            They are not intended to diagnose, treat, cure, or prevent any disease. Please consult a healthcare professional 
            before use if you have any medical conditions or are pregnant/nursing.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© {currentYear} Annapurnanand HerbalGold. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="text-xs">FSSAI License: XXXXXXXXXX</span>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
