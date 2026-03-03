import productsData from '@/data/products.json';
import ProductClient from './ProductClient';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = productsData.products.find(p => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | Annapurnanand',
    };
  }

  // Benefit-focused title: "Product Name | shortDescription — Brand"
  const title = `${product.name} | ${product.shortDescription} — Annapurnanand`;
  // SEO description from doctorNote (first 155 chars)
  const description = product.doctorNote.length > 155
    ? product.doctorNote.slice(0, 152) + '...'
    : product.doctorNote;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: product.image, alt: product.name }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
    },
    keywords: [
      product.name,
      product.category,
      'Moringa',
      'Ayurvedic',
      'Godavari Riverbelt',
      'Dr. Mohini Zate',
      ...(product.idealFor || []),
    ],
  };
}

export default function ProductPage() {
  return <ProductClient />;
}
