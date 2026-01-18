import Link from 'next/link';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export const metadata = {
  title: 'Blog | Health Tips & Wellness',
  description: 'Expert health tips, Ayurvedic wisdom, and nutritional insights from Dr. Mohini Zate. Learn how to incorporate Moringa into your daily routine.',
};

const blogPosts = [
  {
    slug: 'moringa-superfood-guide',
    title: 'The Complete Guide to Moringa: Nature\'s Superfood',
    excerpt: 'Discover why Moringa oleifera is called the "Miracle Tree" and how it can transform your daily nutrition.',
    author: 'Dr. Mohini Zate',
    date: 'January 10, 2026',
    readTime: '8 min read',
    category: 'Nutrition',
    featured: true,
  },
  {
    slug: 'ayurveda-modern-life',
    title: 'Integrating Ayurvedic Wisdom into Modern Life',
    excerpt: 'Simple ways to bring ancient health principles into your busy daily routine without major lifestyle changes.',
    author: 'Dr. Mohini Zate',
    date: 'January 5, 2026',
    readTime: '6 min read',
    category: 'Wellness',
    featured: false,
  },
  {
    slug: 'iron-deficiency-natural-solutions',
    title: 'Fighting Iron Deficiency Naturally with Plant-Based Foods',
    excerpt: 'Learn how Moringa and other plant sources can help address iron deficiency without supplements.',
    author: 'Dr. Mohini Zate',
    date: 'December 28, 2025',
    readTime: '7 min read',
    category: 'Health',
    featured: false,
  },
  {
    slug: 'moringa-recipes-smoothies',
    title: '5 Delicious Moringa Smoothie Recipes for the Whole Family',
    excerpt: 'Kid-approved smoothie recipes that pack a nutritional punch with our Moringa Cocoa Smoothie Mix.',
    author: 'HerbalGold Team',
    date: 'December 20, 2025',
    readTime: '5 min read',
    category: 'Recipes',
    featured: false,
  },
  {
    slug: 'godavari-riverbelt-story',
    title: 'From the Godavari Riverbelt: A Farmer\'s Perspective',
    excerpt: 'Meet the farming families behind our products and learn about sustainable agriculture in the Riverbelt.',
    author: 'HerbalGold Team',
    date: 'December 15, 2025',
    readTime: '10 min read',
    category: 'Stories',
    featured: false,
  },
  {
    slug: 'digestive-health-ayurveda',
    title: 'Digestive Health in Ayurveda: The Foundation of Wellness',
    excerpt: 'Understanding Agni (digestive fire) and how traditional herbs support optimal gut health.',
    author: 'Dr. Mohini Zate',
    date: 'December 10, 2025',
    readTime: '9 min read',
    category: 'Wellness',
    featured: false,
  },
];

export default function BlogPage() {
  const featuredPost = blogPosts.find(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

  return (
    <>
      {/* Page Header */}
      <PageHeader 
        title="Health & Wellness Blog" 
        description="Expert insights on nutrition, Ayurveda, and holistic wellness from Dr. Mohini and our team." 
      />

      {/* Featured Post */}
      {featuredPost && (
        <section className="section bg-[var(--parchment)]">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="aspect-[16/10] bg-gradient-to-br from-[var(--herbal-green)] to-[var(--riverbelt-blue)] rounded-2xl flex items-center justify-center">
                <span className="text-8xl">🌿</span>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[var(--premium-gold)] text-[var(--text-primary)] px-3 py-1 rounded-full text-xs font-bold uppercase">
                    Featured
                  </span>
                  <span className="text-sm text-[var(--herbal-green)] font-medium">
                    {featuredPost.category}
                  </span>
                </div>

                <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">
                  {featuredPost.title}
                </h2>

                <p className="text-[var(--text-secondary)] mb-6 text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mb-6">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>

                <Link href={`/blog/${featuredPost.slug}`} className="btn btn-link inline-flex items-center gap-2">
                  Read Full Article
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="section">
        <div className="container mx-auto px-4">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] mb-8">
            Latest Articles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <article className="card h-full flex flex-col">
                  <div className="aspect-[16/10] bg-gradient-to-br from-[var(--herbal-green-light)]/20 to-[var(--riverbelt-blue-light)]/20 flex items-center justify-center">
                    <span className="text-5xl">📝</span>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[var(--herbal-green)]/10 text-[var(--herbal-green)] px-2 py-1 rounded text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="text-xs text-[var(--text-light)]">
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--herbal-green)] transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[var(--text-light)]">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-[var(--parchment-dark)]">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] mb-4">
              Get Health Tips in Your Inbox
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Subscribe to receive Dr. Mohini's wellness newsletter with exclusive tips, 
              recipes, and early access to new products.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)] focus:ring-opacity-20 outline-none"
              />
              <button className="btn-gold py-3 px-6 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
