import { Waves, Thermometer, Droplet, Leaf, Mountain, Award } from 'lucide-react';
import RiverbeltStory from '@/components/RiverbeltStory';
import Image from 'next/image';

export const metadata = {
  title: 'The Godavari Riverbelt | Our Source',
  description: 'Discover why the Godavari Riverbelt produces some of the most nutrient-dense Moringa in India. Learn about our FPC partnership and sustainable sourcing.',
};

const riverbeltFacts = [
  {
    icon: Waves,
    title: 'Alluvial Soil',
    stat: '2,000+ Years',
    description: 'The Godavari has deposited mineral-rich silt for millennia, creating one of India\'s most fertile agricultural regions.',
  },
  {
    icon: Thermometer,
    title: 'Optimal Climate',
    stat: '25-35°C',
    description: 'Perfect temperature range for Moringa cultivation, ensuring maximum nutrient development in leaves.',
  },
  {
    icon: Droplet,
    title: 'Natural Irrigation',
    stat: '1,465 km',
    description: 'The Godavari, India\'s second-longest river, provides consistent natural irrigation to our farms.',
  },
  {
    icon: Leaf,
    title: 'Nutrient Density',
    stat: '40% Higher',
    description: 'Independent lab tests show our Riverbelt Moringa has significantly higher iron and calcium content.',
  },
];

export default function RiverbeltPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--riverbelt-blue)] to-[var(--herbal-green-dark)]">
          {/* Decorative Wave Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="absolute bottom-0 w-full h-48" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="white" opacity=".3"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="white" opacity=".5"></path>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white"></path>
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Mountain size={16} />
            <span>Our Source</span>
          </div>
          
          <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            The Godavari Riverbelt
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Where ancient rivers meet modern science. Discover why this sacred land 
            produces India's finest Moringa.
          </p>
        </div>
      </section>

      {/* Riverbelt Facts Grid */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--herbal-green)] mb-4">
              Why the Riverbelt?
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              The unique geography and climate of the Godavari region creates perfect conditions 
              for growing premium Moringa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {riverbeltFacts.map((fact, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[var(--riverbelt-blue)]/10 to-[var(--herbal-green)]/10 flex items-center justify-center mb-4">
                  <fact.icon size={28} className="text-[var(--riverbelt-blue)]" />
                </div>
                <p className="text-3xl font-bold text-[var(--premium-gold)] mb-2">
                  {fact.stat}
                </p>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                  {fact.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {fact.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Riverbelt Story Timeline */}
      <RiverbeltStory />

      {/* FPC Partnership Section */}
      <section className="section bg-[var(--parchment-dark)]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[var(--herbal-green)]/10 text-[var(--herbal-green)] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award size={16} />
                <span>Farmer Partnership</span>
              </div>

              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--riverbelt-blue)] mb-4">
                HerbalGold Farmer Producer Company
              </h2>

              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                We don't just source from farmers—we're partners in their success. HerbalGold FPC 
                is a collective of over 500 farming families who cultivate Moringa using traditional, 
                sustainable methods passed down through generations.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Fair prices guaranteed above market rates',
                  'Complete crop traceability from seed to shelf',
                  'Training in organic and sustainable practices',
                  'Community development programs for farmer families',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--premium-gold)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-[var(--text-primary)]">{item}</span>
                  </li>
                ))}
              </ul>

              <a href="/about" className="btn-herbal">
                Learn More About Our Story
              </a>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-[var(--herbal-green)] to-[var(--riverbelt-blue)] rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-center text-white p-8">
                  <span className="text-7xl mb-4 block">🌾</span>
                  <p className="text-2xl font-[family-name:var(--font-heading)] font-semibold">
                    500+ Farming Families
                  </p>
                  <p className="text-white/80">HerbalGold FPC Members</p>
                </div>
              </div>
              
              {/* Stats Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                <p className="text-3xl font-bold text-[var(--herbal-green)]">10,000+</p>
                <p className="text-sm text-[var(--text-secondary)]">Acres under cultivation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[var(--riverbelt-blue)] to-[var(--herbal-green)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white mb-4">
            Experience the Riverbelt Difference
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Taste the quality that comes from India's most fertile Moringa-growing region.
          </p>
          <a href="/shop" className="btn-gold text-lg px-8 py-4">
            Shop Our Products
          </a>
        </div>
      </section>
    </>
  );
}
