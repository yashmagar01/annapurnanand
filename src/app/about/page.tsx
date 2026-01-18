import Link from 'next/link';
import { Award, GraduationCap, Heart, Users, Target, Leaf, Sprout, Tractor, Sun, ArrowRight, ShieldCheck } from 'lucide-react';
import FounderSpotlight from '@/components/FounderSpotlight';
import RiverbeltStory from '@/components/RiverbeltStory';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import PageHeader from '@/components/PageHeader';

export const metadata = {
  title: 'Our Story | Dr. Mohini Zate & HerbalGold',
  description: 'Learn about Dr. Mohini Zate, the founder of Annapurnanand HerbalGold, and our mission to bring pure, science-backed Moringa nutrition from the Godavari Riverbelt.',
};

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: 'Our Story' }]} />
        </div>
      </div>

      {/* Page Header */}
      <PageHeader 
        title="Our Story – From Soil to Soul" 
        description="The journey of bringing ancient Ayurvedic wisdom and modern nutritional science together for your family's health."
        icon={<Heart size={24} />}
      />

      {/* Mission Section */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission Card */}
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-[var(--parchment-dark)]">
              <div className="w-16 h-16 mx-auto rounded-full bg-[var(--herbal-green)]/10 flex items-center justify-center mb-6">
                <Target size={32} className="text-[var(--herbal-green)]" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold mb-3 text-[var(--text-primary)]">
                Our Mission
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                To make premium plant-based nutrition accessible to every Indian household 
                while supporting sustainable farming communities.
              </p>
            </div>

            {/* Promise Card */}
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-[var(--parchment-dark)]">
              <div className="w-16 h-16 mx-auto rounded-full bg-[var(--riverbelt-blue)]/10 flex items-center justify-center mb-6">
                <Leaf size={32} className="text-[var(--riverbelt-blue)]" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold mb-3 text-[var(--text-primary)]">
                Our Promise
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                100% natural ingredients, traceable sourcing from the Godavari Riverbelt, 
                and formulations backed by both tradition and science.
              </p>
            </div>

            {/* Community Card */}
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-[var(--parchment-dark)]">
              <div className="w-16 h-16 mx-auto rounded-full bg-[var(--premium-gold)]/10 flex items-center justify-center mb-6">
                <Users size={32} className="text-[var(--premium-gold)]" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold mb-3 text-[var(--text-primary)]">
                Our Community
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
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

      {/* HerbalGold FPC Section */}
      <section className="section bg-[var(--herbal-green-50)]">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[var(--herbal-green)]/10">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-[var(--herbal-green)] font-semibold mb-4">
                  <Tractor size={20} />
                  <span>Growing Together</span>
                </div>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-6">
                  HerbalGold Farmer Producer Company
                </h2>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                  We are more than just a brand. We are a collective of farmers from the Godavari Riverbelt, 
                  dedicated to sustainable agriculture and traceable nutrition. Every product you buy directly supports our farming community.
                </p>
                
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-3xl font-bold text-[var(--herbal-green)] font-[family-name:var(--font-heading)]">500+</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Farmers</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[var(--riverbelt-blue)] font-[family-name:var(--font-heading)]">2000+</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Acres</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[var(--premium-gold)] font-[family-name:var(--font-heading)]">100%</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Traceable</p>
                  </div>
                </div>
              </div>
              <div className="bg-[var(--herbal-green)]/5 relative min-h-[300px] lg:min-h-full flex items-center justify-center p-8">
                {/* Abstract Farm Illustration */}
                <div className="absolute inset-0 opacity-10 pattern-leaves" />
                <div className="text-center relative z-10">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Sprout size={40} className="text-[var(--herbal-green)]" />
                  </div>
                  <p className="text-[var(--herbal-green-dark)] font-medium">Cultivating Health,<br/>Harvesting Hope</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-6">
            Ready to experience the purity?
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-8">
            Join thousands of families trusting Annapurnanand for their daily nutrition.
          </p>
          <Button
            href="/shop"
            size="lg"
            variant="primary"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
          >
            Explore Our Moringa Range
          </Button>
        </div>
      </section>
    </>
  );
}
