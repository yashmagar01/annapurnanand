import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, ShoppingCart } from 'lucide-react';
import productsData from '@/data/products.json';

interface BlogRelatedProductsProps {
  productIds: string[];
}

export default function BlogRelatedProducts({ productIds }: BlogRelatedProductsProps) {
  const products = productsData.products.filter(p => productIds.includes(p.id));
  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-[var(--parchment-dark)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-[var(--herbal-green-50)] text-[var(--herbal-green)] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Leaf size={16} />
            Featured in This Article
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Ready to Experience the Benefits?
          </h2>
          <p className="text-[var(--text-secondary)] mt-2">The products Dr. Mohini discusses are available to order now.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {products.map(product => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="aspect-square bg-gradient-to-br from-[var(--herbal-green-light)]/20 to-[var(--riverbelt-blue-light)]/20 relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <div className="absolute top-3 left-3 bg-[var(--premium-gold)] text-[var(--text-primary)] px-2 py-1 rounded-lg text-xs font-bold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs font-medium text-[var(--herbal-green)] mb-1">{product.category}</p>
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-[var(--text-primary)] group-hover:text-[var(--herbal-green)] transition-colors mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4 flex-1">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[var(--herbal-green)]">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-[var(--text-light)] line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-[var(--herbal-green)] group-hover:gap-2 transition-all">
                    <ShoppingCart size={16} />
                    <span>Shop</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
