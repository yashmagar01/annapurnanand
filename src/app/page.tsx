import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';
import TrustIcons from '@/components/TrustIcons';
import FounderSpotlight from '@/components/FounderSpotlight';
import RiverbeltStory from '@/components/RiverbeltStory';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';

export default function Home() {
  const featuredProducts = productsData.products.filter(p => p.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--riverbelt-blue)] via-[var(--herbal-green-dark)] to-[var(--herbal-green)]">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-96 h-96 border-2 border-white rounded-full" />
            <div className="absolute bottom-20 right-20 w-72 h-72 border-2 border-white rounded-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white rounded-full" />
          </div>
          
          {/* Floating Leaves */}
          <div className="absolute top-1/4 right-1/4 opacity-20">
            <Leaf size={120} className="text-white" />
          </div>
          <div className="absolute bottom-1/4 left-1/3 opacity-10 rotate-45">
            <Leaf size={80} className="text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in-up">
              <Leaf size={16} />
              <span>From the Godavari Riverbelt</span>
            </div>

            {/* Headline - Fixed contrast with parchment-cream + text-shadow */}
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up animation-delay-100" style={{ color: 'var(--parchment-cream)', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
              Pure Plant-Based Nutrition from the{' '}
              <span className="text-[var(--premium-gold)]" style={{ textShadow: '0 2px 15px rgba(212,175,55,0.4)' }}>Godavari Riverbelt</span>
            </h1>

            {/* Subheadline with improved contrast */}
            <p className="text-xl sm:text-2xl mb-8 leading-relaxed animate-fade-in-up animation-delay-200" style={{ color: 'rgba(255,255,255,0.95)', textShadow: '0 1px 10px rgba(0,0,0,0.2)' }}>
              Farmer-grown, Science-backed.{' '}
              <span className="font-semibold text-white">Formulated by Dr. Mohini Zate.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-300">
              <Link href="/shop" className="btn-gold text-lg px-8 py-4">
                Explore Our Range
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/about"
                className="btn border-2 border-white text-white hover:bg-white hover:text-[var(--herbal-green)] text-lg px-8 py-4"
              >
                Our Story
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 mt-12 animate-fade-in-up animation-delay-300">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span className="w-2 h-2 bg-[var(--premium-gold)] rounded-full" />
                100% Natural Ingredients
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span className="w-2 h-2 bg-[var(--premium-gold)] rounded-full" />
                FSSAI Certified
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span className="w-2 h-2 bg-[var(--premium-gold)] rounded-full" />
                Free Shipping ₹499+
              </div>
            </div>
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
              fill="var(--parchment)"
            />
          </svg>
        </div>
      </section>

      {/* Trust Icons Strip */}
      <TrustIcons />

      {/* Founder Spotlight */}
      <FounderSpotlight />

      {/* Featured Products */}
      <section className="section-spacious">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-flex items-center gap-2 bg-[var(--herbal-green-50)] text-[var(--herbal-green)] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Leaf size={16} />
              Clinically Aligned Formulations
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--herbal-green)] mb-4">
              Featured Products
            </h2>
            <div className="divider-gold" />
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg mt-4">
              Explore our Moringa-based nutrition products, each carefully formulated 
              by Dr. Mohini for optimal benefit.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                shortDescription={product.shortDescription}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                netQty={product.netQty}
                category={product.category}
                idealFor={product.idealFor}
                featured={index === 0}
              />
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-12">
            <Link href="/shop" className="btn-outline text-lg px-8 py-3">
              View All Products
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Riverbelt Story */}
      <RiverbeltStory />

      {/* Newsletter / CTA Section - Dr. Mohini's Riverbelt Journal */}
      <section className="section-spacious bg-gradient-to-br from-[var(--herbal-green)] via-[var(--herbal-green-dark)] to-[var(--riverbelt-blue)]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold mb-4">
              Dr. Mohini's Riverbelt Journal
            </h2>
            <p className="text-white/90 mb-6 text-lg leading-relaxed">
              Monthly Ayurvedic Almanac • Family Immunity Guides • Early Harvest Access
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-[var(--premium-gold)] focus:bg-white/20 min-h-[44px]"
              />
              <button className="btn-gold py-3 px-6 whitespace-nowrap min-h-[44px]">
                Receive Insights
              </button>
            </div>

            <p className="text-white/60 text-sm mt-4">
              Join practitioners & families. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
