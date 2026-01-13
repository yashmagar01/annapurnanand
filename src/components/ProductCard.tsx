'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Award, Users } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  image: string;
  netQty: string;
  category: string;
  idealFor?: string[]; // Added for audience segmentation
  featured?: boolean;  // For bestseller treatment
}

export default function ProductCard({
  id,
  slug,
  name,
  shortDescription,
  price,
  originalPrice,
  image,
  netQty,
  category,
  idealFor = [],
  featured = false,
}: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      name,
      price,
      image,
      netQty,
    });
  };

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Link href={`/product/${slug}`} className="block group">
      <div className="card h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-[var(--parchment)]">
          <div className="aspect-square relative">
            {/* Placeholder gradient if no image */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--herbal-green-light)]/20 to-[var(--riverbelt-blue-light)]/20 flex items-center justify-center">
              <div className="text-6xl">🌿</div>
            </div>
            {/* Actual image would go here */}
            {/* <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            /> */}
          </div>

          {/* Bestseller Ribbon */}
          {featured && (
            <div className="absolute top-0 left-0">
              <div className="bg-gradient-to-r from-[var(--premium-gold)] to-[var(--premium-gold-light)] text-[var(--text-primary)] px-3 py-1 text-xs font-bold uppercase shadow-md">
                ★ Bestseller
              </div>
            </div>
          )}

          {/* Discount Badge */}
          {discount > 0 && !featured && (
            <div className="absolute top-3 left-3 bg-[var(--premium-gold)] text-[var(--text-primary)] px-2 py-1 rounded-md text-xs font-bold">
              {discount}% OFF
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-[var(--herbal-green)]">
            {category}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 w-10 h-10 bg-[var(--herbal-green)] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[var(--herbal-green-dark)] shadow-lg"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          {/* Doctor Formulated Badge */}
          <div className="doctor-badge mb-2 self-start">
            <Award size={12} />
            <span>Dr. Mohini's Formulation</span>
          </div>

          {/* Title */}
          <h3 className="font-[family-name:var(--font-heading)] text-base sm:text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--herbal-green)] transition-colors line-clamp-2 mb-2">
            {name}
          </h3>

          {/* Description */}
          <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-2 flex-1">
            {shortDescription}
          </p>

          {/* Ideal For Tags - Per Audit Requirement */}
          {idealFor.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {idealFor.slice(0, 2).map((audience, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-[var(--herbal-green-50)] text-[var(--herbal-green)] font-medium"
                >
                  <Users size={10} />
                  {audience}
                </span>
              ))}
              {idealFor.length > 2 && (
                <span className="text-xs px-2 py-1 text-[var(--text-light)]">
                  +{idealFor.length - 2} more
                </span>
              )}
            </div>
          )}

          {/* Net Qty */}
          <p className="text-xs text-[var(--text-light)] mb-3">
            Net Qty: {netQty}
          </p>

          {/* Price - Separate Row */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl sm:text-2xl font-bold text-[var(--herbal-green)]">
              ₹{price}
            </span>
            {originalPrice && (
              <span className="text-sm text-[var(--text-light)] line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>

          {/* CTA - Full Width on Mobile (Organic India Pattern) */}
          <button
            onClick={handleAddToCart}
            className="btn-gold text-sm py-3 px-4 w-full min-h-[44px] justify-center"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
