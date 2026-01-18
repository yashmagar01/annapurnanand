'use client';

import { useEffect, useRef, useState } from 'react';
import { Waves, Tractor, Microscope, Home, ArrowRight } from 'lucide-react';
import productsData from '@/data/products.json';
import RiverbeltPath from './RiverbeltPath';
import { Button } from '@/components/ui/Button';

const { riverbeltStory } = productsData;

const iconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
  river: Waves,
  tractor: Tractor,
  microscope: Microscope,
  home: Home,
};

export default function RiverbeltStory() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the section is visible
      const visibleTop = Math.max(0, -rect.top);
      const progress = visibleTop / (sectionHeight - viewportHeight);
      
      // Map progress to step (0-3)
      const step = Math.min(3, Math.floor(progress * 4));
      setActiveStep(step);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-spacious relative bg-gradient-to-b from-[var(--parchment)] via-white to-[var(--parchment)] overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-[var(--riverbelt-blue-100)] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-[var(--herbal-green-100)] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-20">
          <span className="inline-flex items-center gap-2 bg-[var(--riverbelt-blue-50)] text-[var(--riverbelt-blue)] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Waves size={16} />
            Our Journey
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--riverbelt-blue)] mb-4">
            The Soil to Soul Story
          </h2>
          <div className="divider-gold" />
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg mt-4">
            From the fertile banks of the Godavari River to your home, discover how we bring you 
            nature's finest nutrition.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Organic River Path - Replaces straight line */}
          <RiverbeltPath className="h-full" />

          {/* Timeline Steps */}
          {riverbeltStory.map((item, index) => {
            const Icon = iconMap[item.icon] || Waves;
            const isActive = index <= activeStep;
            const isLeft = index % 2 === 0;

            return (
              <div
                key={item.step}
                className={`relative flex items-center mb-12 last:mb-0 ${
                  isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`ml-20 sm:ml-0 sm:w-[calc(50%-2rem)] ${isLeft ? 'sm:pr-8' : 'sm:pl-8'}`}>
                  <div
                    className={`p-6 rounded-xl transition-all duration-500 ${
                      isActive 
                        ? 'bg-white shadow-lg border border-gray-100' 
                        : 'bg-[var(--parchment-dark)] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isActive 
                          ? 'bg-[var(--premium-gold)] text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {item.step}
                      </span>
                      <h3 className={`font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold mb-2 ${
                        isActive ? 'text-[var(--herbal-green)]' : 'text-[var(--text-secondary)]'
                      }`}>
                        {item.title}
                      </h3>
                    </div>
                    <p className={`leading-relaxed ${
                      isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-light)]'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-8 sm:left-1/2 transform -translate-x-1/2">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-br from-[var(--herbal-green)] to-[var(--riverbelt-blue)] shadow-lg scale-110'
                        : 'bg-gray-200'
                    }`}
                  >
                    <Icon
                      size={28}
                      className={isActive ? 'text-white' : 'text-gray-400'}
                    />
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button
            href="/shop"
            size="lg"
            variant="primary"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Experience the Purity
          </Button>
        </div>
      </div>
    </section>
  );
}
