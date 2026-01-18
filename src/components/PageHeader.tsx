import { Leaf } from 'lucide-react';
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function PageHeader({ title, description, icon }: PageHeaderProps) {
  return (
    <section className="relative min-h-[40vh] flex items-center overflow-hidden">
      {/* Background - Matches Homepage Hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--riverbelt-blue)] via-[var(--herbal-green-dark)] to-[var(--herbal-green)]">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 border-2 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white rounded-full" />
        </div>
        
        {/* Floating Leaves */}
        <div className="absolute top-1/4 right-1/4 opacity-20">
          <Leaf size={80} className="text-white" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 opacity-10 rotate-45">
          <Leaf size={60} className="text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
            {icon && (
                <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 text-[var(--premium-gold)] backdrop-blur-sm ring-1 ring-white/20">
                    {icon}
                </div>
            )}
          <h1 
            className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up" 
            style={{ 
              color: 'var(--parchment-cream)', 
              textShadow: '0 2px 20px rgba(0,0,0,0.3)' 
            }}
          >
            {title.split(' ').map((word, i) => (
                <span key={i} className={i === title.split(' ').length - 1 ? "text-[var(--premium-gold)]" : ""} style={i === title.split(' ').length - 1 ? { textShadow: '0 2px 15px rgba(212,175,55,0.4)' } : {}}>
                    {word}{' '}
                </span>
            ))}
          </h1>

          {description && (
            <p 
              className="text-xl sm:text-2xl mb-8 leading-relaxed animate-fade-in-up animation-delay-100" 
              style={{ color: 'rgba(255,255,255,0.95)', textShadow: '0 1px 10px rgba(0,0,0,0.2)' }}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="var(--parchment)" // Matches the background color of the next section
          />
        </svg>
      </div>
    </section>
  );
}
