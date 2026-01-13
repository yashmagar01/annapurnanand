'use client';

import { Sprout, FlaskConical, Shield, Waves } from 'lucide-react';

const trustItems = [
  {
    icon: Sprout,
    title: 'Farmer Producer Company',
    description: '500+ HerbalGold FPC Families',
    gradient: 'from-[var(--herbal-green-100)] to-[var(--herbal-green-50)]',
    iconColor: 'text-[var(--herbal-green)]',
  },
  {
    icon: Waves,
    title: 'Godavari Riverbelt',
    description: 'Traceable Origin',
    gradient: 'from-[var(--riverbelt-blue-100)] to-[var(--riverbelt-blue-50)]',
    iconColor: 'text-[var(--riverbelt-blue)]',
  },
  {
    icon: FlaskConical,
    title: 'Doctor Formulated',
    description: 'Dr. Mohini Zate (BAMS, MPH-N)',
    gradient: 'from-[var(--premium-gold-100)] to-[var(--premium-gold-50)]',
    iconColor: 'text-[var(--premium-gold-dark)]',
  },
  {
    icon: Shield,
    title: 'FSSAI Licensed',
    description: 'Quality Certified',
    gradient: 'from-[var(--herbal-green-100)] to-[var(--herbal-green-50)]',
    iconColor: 'text-[var(--herbal-green)]',
  },
];

export default function TrustIcons() {
  return (
    <section className="bg-gradient-to-b from-[var(--parchment)] to-[var(--parchment-dark)] py-8 lg:py-10 border-b border-[var(--premium-gold-100)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {trustItems.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 lg:gap-4 justify-center lg:justify-start group cursor-default p-3 lg:p-4 rounded-xl hover:bg-white/50 transition-all duration-300"
            >
              {/* Icon with Organic Feel */}
              <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300 relative`}>
                {/* Subtle ring */}
                <div className="absolute inset-0 rounded-full border-2 border-[var(--premium-gold)]/20 group-hover:border-[var(--premium-gold)]/40 transition-colors" />
                <item.icon 
                  size={24} 
                  className={`${item.iconColor} lg:w-7 lg:h-7`} 
                  strokeWidth={1.5}
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-[var(--text-primary)] text-sm lg:text-base leading-tight">
                  {item.title}
                </p>
                <p className="text-xs lg:text-sm text-[var(--text-secondary)] mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
