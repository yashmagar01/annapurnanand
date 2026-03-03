import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, Clock, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import BlogRelatedProducts from '@/components/BlogRelatedProducts';

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');

function getBlogPost(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { frontmatter: data, content };
}

export async function generateStaticParams() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
  return files.map(f => ({ slug: f.replace(/\.mdx$/, '') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const { frontmatter } = post;
  return {
    title: `${frontmatter.title} | Annapurnanand Blog`,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      images: frontmatter.ogImage ? [{ url: frontmatter.ogImage }] : [],
    },
  };
}

// MDX prose components — clean, on-brand styling
const mdxComponents = {
  h1: (props: any) => <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[var(--riverbelt-blue)] mb-6 mt-10" {...props} />,
  h2: (props: any) => <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--herbal-green)] mb-4 mt-10 pb-2 border-b border-gray-100" {...props} />,
  h3: (props: any) => <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--text-primary)] mb-3 mt-8" {...props} />,
  p: (props: any) => <p className="text-[var(--text-primary)] leading-relaxed mb-5 text-base sm:text-lg" {...props} />,
  ul: (props: any) => <ul className="space-y-2 mb-5 ml-6 list-disc marker:text-[var(--herbal-green)]" {...props} />,
  ol: (props: any) => <ol className="space-y-2 mb-5 ml-6 list-decimal marker:text-[var(--herbal-green)] marker:font-bold" {...props} />,
  li: (props: any) => <li className="text-[var(--text-primary)] leading-relaxed" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-[var(--premium-gold)] pl-5 py-2 bg-[var(--parchment-cream)] rounded-r-xl my-6 italic text-[var(--text-secondary)]" {...props} />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full rounded-xl overflow-hidden border border-gray-200 text-sm" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-[var(--herbal-green)] text-white" {...props} />,
  th: (props: any) => <th className="px-4 py-3 text-left font-semibold" {...props} />,
  td: (props: any) => <td className="px-4 py-3 border-t border-gray-100" {...props} />,
  tr: (props: any) => <tr className="even:bg-[var(--parchment)]" {...props} />,
  strong: (props: any) => <strong className="font-bold text-[var(--text-primary)]" {...props} />,
  em: (props: any) => <em className="italic text-[var(--text-secondary)]" {...props} />,
  hr: () => <hr className="my-10 border-[var(--premium-gold)]/30" />,
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;
  const relatedProductIds: string[] = frontmatter.relatedProducts || [];

  return (
    <div className="min-h-screen bg-[var(--parchment)]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Link href="/" className="hover:text-[var(--herbal-green)]">Home</Link>
            <ChevronRight size={14} />
            <Link href="/blog" className="hover:text-[var(--herbal-green)]">Blog</Link>
            <ChevronRight size={14} />
            <span className="text-[var(--text-primary)] truncate max-w-[200px]">{frontmatter.title}</span>
          </div>
        </div>
      </div>

      {/* Article Hero */}
      <div className="bg-gradient-to-br from-[var(--herbal-green-dark)] via-[var(--herbal-green)] to-[var(--riverbelt-blue)] text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block bg-white/20 border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            {frontmatter.category}
          </span>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {frontmatter.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{frontmatter.author}</span>
              {frontmatter.credentials && (
                <span className="text-[var(--premium-gold)] font-semibold">{frontmatter.credentials}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{frontmatter.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{frontmatter.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="container mx-auto px-4 max-w-3xl py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <MDXRemote source={content} components={mdxComponents} />
        </div>

        {/* Author Card */}
        <div className="mt-12 bg-gradient-to-r from-[var(--riverbelt-blue-50)] to-[var(--herbal-green-50)] border border-[var(--riverbelt-blue)]/20 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-[var(--riverbelt-blue)] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            {frontmatter.author === 'Dr. Mohini Zate' ? 'Dr' : 'HG'}
          </div>
          <div>
            <p className="font-bold text-[var(--text-primary)]">{frontmatter.author}</p>
            {frontmatter.credentials && (
              <p className="text-sm text-[var(--herbal-green)] font-semibold">{frontmatter.credentials}</p>
            )}
            <p className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">
              Founder & Chief Formulator, Annapurnanand HerbalGold. Former District Epidemiologist with 10+ years in community health & nutrition.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 flex justify-between items-center">
          <Button href="/blog" variant="secondary" icon={<ArrowLeft size={18} />} iconPosition="left">
            All Articles
          </Button>
          <Button href="/shop">
            Shop All Products
          </Button>
        </div>
      </article>

      {/* Related Products — Turn Readers into Customers */}
      {relatedProductIds.length > 0 && (
        <BlogRelatedProducts productIds={relatedProductIds} />
      )}
    </div>
  );
}
