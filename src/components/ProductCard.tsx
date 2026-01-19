'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Award, Users, Check, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

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
  const [isAdded, setIsAdded] = useState(false);

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
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Link href={`/product/${slug}`} className="block group h-full">
      <div className="card h-full flex flex-col relative transition-all duration-300 hover:shadow-xl border border-transparent hover:border-[var(--herbal-green-100)]">
        
        {/* Image Container */}
        <div className="relative overflow-hidden bg-[var(--parchment)] aspect-square rounded-t-xl group-hover:rounded-t-xl">
            {/* Discount Badge - Top Left */}
            {discount > 0 && !featured && (
             <div className="absolute top-3 left-3 z-10 bg-[var(--premium-gold)] text-[var(--text-primary)] px-2.5 py-1 rounded-md text-xs font-bold shadow-sm">
               {discount}% OFF
             </div>
           )}

           {/* Bestseller Badge - Top Left */}
           {featured && (
             <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[var(--premium-gold)] to-[var(--premium-gold-light)] text-[var(--text-primary)] px-3 py-1 text-xs font-bold uppercase shadow-sm flex items-center gap-1 rounded-sm">
               <Star size={10} fill="currentColor" /> Bestseller
             </div>
           )}

           {/* Category Badge - Top Right */}
           <div className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-medium text-[var(--herbal-green)] shadow-sm border border-[var(--herbal-green-100)]">
             {category}
           </div>

            {/* Product Image */}
            <div className="relative w-full h-full">
                 <Image
                   src={image}
                   alt={name}
                   fill
                   className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                   onError={(e) => {
                     e.currentTarget.style.display = 'none';
                   }}
                 />
                 {/* Fallback */}
                 <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--herbal-green-light)]/10 to-[var(--riverbelt-blue-light)]/10 flex items-center justify-center">
                   <div className="text-6xl opacity-20">🌿</div>
                 </div>
            </div>

             {/* Quick Add Button - Floating Action Button Style for Desktop Hover */}
             <button
               onClick={handleAddToCart}
               className={`absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-20 
                 ${isAdded 
                   ? 'bg-[var(--herbal-green-dark)] text-white scale-100 opacity-100 translate-y-0' 
                   : 'bg-white text-[var(--herbal-green)] hover:bg-[var(--herbal-green)] hover:text-white lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 opacity-100 translate-y-0'
                 }`}
               aria-label="Add to cart"
             >
               {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
             </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Doctor Badge */}
          <div className="mb-2 self-start flex items-center gap-1.5 text-[10px] font-bold text-[var(--riverbelt-blue)] bg-[var(--riverbelt-blue-50)] px-2 py-0.5 rounded-full border border-[var(--riverbelt-blue-100)]">
            <Award size={10} />
            <span>DR. MOHINI'S FORMULATION</span>
          </div>

          {/* Title */}
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--herbal-green)] transition-colors line-clamp-2 mb-2 leading-tight">
            {name}
          </h3>

          {/* Ideal For Tags - Compact */}
          {idealFor.length > 0 && (
             <div className="flex flex-wrap gap-1 mb-3">
               {idealFor.slice(0, 2).map((audience, index) => (
                 <span 
                   key={index}
                   className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[var(--herbal-green-50)] text-[var(--herbal-green-dark)] font-medium border border-[var(--herbal-green-100)]"
                 >
                   <Users size={10} />
                   {audience}
                 </span>
               ))}
             </div>
           )}

          {/* Description */}
          <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4 flex-1">
            {shortDescription}
          </p>

          {/* Footer: Price & Net Qty */}
          <div className="mt-auto pt-4 border-t border-gray-50 flex items-end justify-between">
              <div>
                  <p className="text-[10px] text-[var(--text-light)] font-medium uppercase tracking-wider mb-0.5">
                    {netQty}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-[var(--text-primary)]">
                      ₹{price}
                    </span>
                    {originalPrice && (
                      <span className="text-xs text-[var(--text-light)] line-through">
                        ₹{originalPrice}
                      </span>
                    )}
                  </div>
              </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
