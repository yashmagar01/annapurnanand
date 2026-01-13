import { Award, GraduationCap, Heart, Users, Target, Leaf } from 'lucide-react';
import FounderSpotlight from '@/components/FounderSpotlight';
import RiverbeltStory from '@/components/RiverbeltStory';

export const metadata = {
  title: 'Our Story | Dr. Mohini Zate & HerbalGold',
  description: 'Learn about Dr. Mohini Zate, the founder of Annapurnanand HerbalGold, and our mission to bring pure, science-backed Moringa nutrition from the Godavari Riverbelt.',
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[var(--riverbelt-blue)] to-[var(--herbal-green)] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Heart size={16} />
              Our Story
            </span>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-bold mb-4">
              From Soil to Soul
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              The journey of bringing ancient Ayurvedic wisdom and modern nutritional science 
              together for your family's health.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[var(--herbal-green)]/10 flex items-center justify-center mb-4">
                <Target size={32} className="text-[var(--herbal-green)]" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-2 text-[var(--text-primary)]">
                Our Mission
              </h3>
              <p className="text-[var(--text-secondary)]">
                To make premium plant-based nutrition accessible to every Indian household 
                while supporting sustainable farming communities.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[var(--riverbelt-blue)]/10 flex items-center justify-center mb-4">
                <Leaf size={32} className="text-[var(--riverbelt-blue)]" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-2 text-[var(--text-primary)]">
                Our Promise
              </h3>
              <p className="text-[var(--text-secondary)]">
                100% natural ingredients, traceable sourcing from the Godavari Riverbelt, 
                and formulations backed by both tradition and science.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[var(--premium-gold)]/10 flex items-center justify-center mb-4">
                <Users size={32} className="text-[var(--premium-gold)]" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-2 text-[var(--text-primary)]">
                Our Community
              </h3>
              <p className="text-[var(--text-secondary)]">
                Working directly with HerbalGold Farmer Producer Company members ensures 
                fair prices for farmers and premium quality for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <FounderSpotlight />

      {/* Riverbelt Story */}
      <RiverbeltStory />

      {/* Why Choose Us */}
      <section className="section bg-[var(--parchment-dark)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--herbal-green)] mb-4">
              Why Choose Annapurnanand?
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              What sets us apart in the crowded world of herbal supplements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: GraduationCap,
                title: 'Doctor Formulated',
                description: 'Every product is formulated by Dr. Mohini Zate with her dual expertise in Ayurveda and Public Health.',
              },
              {
                icon: Leaf,
                title: 'Traceable Origin',
                description: 'Complete transparency from the Godavari Riverbelt farms to your home.',
              },
              {
                icon: Award,
                title: 'Quality Certified',
                description: 'FSSAI licensed with rigorous quality testing at every stage.',
              },
              {
                icon: Heart,
                title: 'Family Friendly',
                description: 'Products designed for the whole family—children, adults, and elderly.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[var(--herbal-green)]/10 flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-[var(--herbal-green)]" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
