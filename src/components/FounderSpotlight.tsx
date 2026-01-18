import Image from 'next/image';
import { Award, GraduationCap, Stethoscope, Users, Sparkles } from 'lucide-react';
import productsData from '@/data/products.json';

const { founder } = productsData;

export default function FounderSpotlight() {
  return (
    <section className="section-spacious bg-gradient-to-b from-[var(--parchment)] to-[var(--parchment-dark)]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-[var(--premium-gold-50)] text-[var(--premium-gold-dark)] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            <span>Meet the Founder-Formulator</span>
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--riverbelt-blue)] mb-4">
            Dr. {founder.name.split(' ').slice(1).join(' ')}
          </h2>
          <div className="divider-gold" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Image Side - Premium Treatment */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              {/* Decorative Background Elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-[var(--premium-gold)] to-[var(--premium-gold-light)] rounded-full blur-3xl opacity-30" />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-[var(--herbal-green)] to-[var(--herbal-green-light)] rounded-full blur-3xl opacity-25" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[var(--premium-gold)]/20 rounded-full" />
              
              {/* Main Image Container with Gold Border */}
              <div className="relative rounded-2xl overflow-hidden gold-border-subtle bg-gradient-to-br from-[var(--herbal-green)] via-[var(--herbal-green-dark)] to-[var(--riverbelt-blue)] shadow-2xl">
                {/* Image Placeholder with Premium Feel */}
                <div className="aspect-[3/4] flex flex-col items-center justify-center text-white p-8 relative">
                  {/* Subtle Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full" />
                    <div className="absolute bottom-20 right-10 w-16 h-16 border border-white rounded-full" />
                  </div>
                  
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 animate-gold-pulse">
                      <Stethoscope size={48} className="text-[var(--premium-gold)]" />
                    </div>
                    <p className="text-2xl font-[family-name:var(--font-heading)] font-semibold mb-2">
                      Dr. Mohini Zate
                    </p>
                    <p className="text-white/80 font-medium">BAMS, MPH-N</p>
                  </div>
                </div>

                {/* Premium Credential Badge - Floating */}
                <div className="absolute bottom-4 left-4 right-4 credential-badge-premium">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--premium-gold)] to-[var(--premium-gold-dark)] flex items-center justify-center flex-shrink-0">
                    <Award className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] text-sm">
                      {founder.credentials}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {founder.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side - Premium Typography */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Mobile Badge (hidden on desktop - shown above header) */}
            {/* Verified Badge removed to reduce visual noise */}

            {/* Description - Clinical Premium (credentials only referenced once here) */}
            <p className="text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed">
              With dual expertise in <span className="text-[var(--herbal-green)] font-semibold">Ayurvedic Medicine</span> and <span className="text-[var(--riverbelt-blue)] font-semibold">Public Health Nutrition</span>, 
              Dr. Mohini bridges ancient wisdom with modern science.
            </p>

            {/* Experience List - Simplified, No BAMS/MPH-N Redundancy */}
            <ul className="premium-list space-y-4">
              {founder.experience.map((exp, index) => (
                <li key={index} className="text-[var(--text-primary)] text-base lg:text-lg leading-relaxed">
                  {exp}
                </li>
              ))}
            </ul>

            {/* Gold Divider */}
            <div className="divider-gold !mx-0 !ml-0 w-16" />

            {/* Power Statement - Condensed Doctor's Promise */}
            {/* Power Statement - New Quote Layout */}
            <div className="mt-8 pt-8 border-t border-[var(--premium-gold)]/20">
              <blockquote className="text-lg lg:text-xl font-medium italic text-[var(--riverbelt-blue)] mb-6 leading-relaxed relative">
                <span className="absolute -top-4 -left-2 text-4xl text-[var(--premium-gold)] opacity-50 font-serif">"</span>
                {(founder as { powerStatement?: string }).powerStatement || founder.quote}
                <span className="absolute -bottom-4 -right-2 text-4xl text-[var(--premium-gold)] opacity-50 font-serif">"</span>
              </blockquote>
              
              <div className="flex items-center gap-4">
                <div className="text-right flex-1">
                  <p className="font-bold text-[var(--text-primary)] text-base font-[family-name:var(--font-heading)]">
                    — {founder.name}
                  </p>
                  <p className="text-sm text-[var(--herbal-green)] font-medium">
                    {founder.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
