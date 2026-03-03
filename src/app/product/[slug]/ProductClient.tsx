'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ShoppingCart, 
  Award, 
  Minus, 
  Plus, 
  Check, 
  Users, 
  ChevronRight,
  Spade,
  Clock,
  Leaf,
  GlassWater,
  Blend,
  Wheat,
  Moon,
  Pill,
  Sun,
  Calendar,
  Heart,
  Package,
  Loader2
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { createClient } from '@/lib/supabase/client';
import productsData from '@/data/products.json';
import { Button } from '@/components/ui/Button';

// Icon mapping for how-to-use section
const howToUseIcons: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
  glass: GlassWater,
  clock: Clock,
  leaf: Leaf,
  blender: Blend,
  fruit: Leaf,
  bowl: Wheat,
  wheat: Wheat,
  spoon: Spade,
  moon: Moon,
  capsule: Pill,
  pill: Pill,
  sun: Sun,
  calendar: Calendar,
  heart: Heart,
};

interface Variant {
  id: string;
  sku: string;
  net_qty: string;
  price: number;
  compare_at_price: number | null;
  stock_quantity: number;
  image_url: string | null;
}

export default function ProductClient() {
  const params = useParams();
  const slug = params.slug as string;
  const [quantity, setQuantity] = useState(1);
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const mainButtonRef = useRef<HTMLDivElement>(null);
  
  // Variant state
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [loadingVariants, setLoadingVariants] = useState(true);

  const { addItem } = useCart();

  // Get static product data (for description, nutrition, etc.)
  const product = productsData.products.find(p => p.slug === slug);

  // Fetch variants from Supabase
  useEffect(() => {
    async function fetchVariants() {
      setLoadingVariants(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', slug)
        .eq('is_active', true)
        .order('price', { ascending: true });

      if (!error && data && data.length > 0) {
        setVariants(data);
        setSelectedVariant(data[0]); // Select first (cheapest) variant by default
      }
      setLoadingVariants(false);
    }

    if (slug) fetchVariants();
  }, [slug]);

  // Intersection Observer for Sticky Bar
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStickyVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-100px 0px 0px 0px"
      }
    );

    const currentRef = mainButtonRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/shop" className="btn-herbal">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  // Use variant price/data if available, otherwise fallback to static JSON
  const activePrice = selectedVariant ? Number(selectedVariant.price) : product.price;
  const activeComparePrice = selectedVariant 
    ? (selectedVariant.compare_at_price ? Number(selectedVariant.compare_at_price) : null)
    : product.originalPrice || null;
  const activeNetQty = selectedVariant ? selectedVariant.net_qty : product.netQty;
  const activeStock = selectedVariant ? selectedVariant.stock_quantity : 100;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      variantId: selectedVariant?.id || product.id,
      sku: selectedVariant?.sku || product.id,
      name: product.name,
      price: activePrice,
      image: selectedVariant?.image_url || product.image,
      netQty: activeNetQty,
      quantity: quantity,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const discount = activeComparePrice 
    ? Math.round(((activeComparePrice - activePrice) / activeComparePrice) * 100) 
    : 0;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[var(--parchment-dark)] py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Link href="/" className="hover:text-[var(--herbal-green)]">Home</Link>
            <ChevronRight size={14} />
            <Link href="/shop" className="hover:text-[var(--herbal-green)]">Shop</Link>
            <ChevronRight size={14} />
            <span className="text-[var(--text-primary)] font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Hero */}
      <section className="section pb-0 sm:pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[var(--herbal-green-light)]/20 to-[var(--riverbelt-blue-light)]/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <Image 
                  src={selectedVariant?.image_url || product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'; 
                  }}
                />
                
                <div className="absolute inset-0 -z-10 flex items-center justify-center">
                    <span className="text-9xl opacity-20">🌿</span>
                </div>

                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-[var(--premium-gold)] text-[var(--text-primary)] px-3 py-1.5 rounded-lg font-bold shadow-sm">
                    {discount}% OFF
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--herbal-green)] shadow-sm">
                  {product.category}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="doctor-badge inline-flex mb-4">
                <Award size={14} />
                <span>Dr. Mohini&apos;s Formulation</span>
              </div>

              <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2">
                {product.name}
              </h1>

              <p className="text-lg text-[var(--text-secondary)] mb-4">
                {product.shortDescription}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-[var(--herbal-green)]">
                  ₹{activePrice}
                </span>
                {activeComparePrice && (
                  <>
                    <span className="text-xl text-[var(--text-light)] line-through">
                      ₹{activeComparePrice}
                    </span>
                    <span className="text-sm font-medium text-[var(--premium-gold)]">
                      Save ₹{activeComparePrice - activePrice}
                    </span>
                  </>
                )}
              </div>

              {/* Variant Selector */}
              {variants.length > 1 && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-[var(--text-secondary)] mb-3">Size / Quantity:</p>
                  <div className="flex flex-wrap gap-3">
                    {variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => { setSelectedVariant(variant); setQuantity(1); }}
                        className={`px-5 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold ${
                          selectedVariant?.id === variant.id
                            ? 'border-[var(--herbal-green)] bg-[var(--herbal-green-50)] text-[var(--herbal-green)] shadow-sm ring-2 ring-[var(--herbal-green)]/20'
                            : 'border-gray-200 bg-white text-[var(--text-primary)] hover:border-[var(--herbal-green-light)]'
                        } ${variant.stock_quantity <= 0 ? 'opacity-50 cursor-not-allowed line-through' : ''}`}
                        disabled={variant.stock_quantity <= 0}
                      >
                        <span className="block">{variant.net_qty}</span>
                        <span className="block text-xs mt-0.5 font-bold">₹{Number(variant.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Indicator */}
              {selectedVariant && (
                <div className="mb-4">
                  {activeStock > 10 ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--herbal-green)] bg-[var(--herbal-green-50)] px-3 py-1 rounded-full">
                      <Package size={12} /> In Stock
                    </span>
                  ) : activeStock > 0 ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                      <Package size={12} /> Only {activeStock} left
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                      <Package size={12} /> Out of Stock
                    </span>
                  )}
                </div>
              )}

              {loadingVariants && (
                <div className="mb-4 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <Loader2 size={16} className="animate-spin" /> Loading availability...
                </div>
              )}

              {/* Key Details */}
              <div className="bg-[var(--parchment)] rounded-xl p-4 mb-6 border border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Net Quantity</p>
                    <p className="font-semibold text-[var(--text-primary)]">{activeNetQty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Category</p>
                    <p className="font-semibold text-[var(--text-primary)]">{product.category}</p>
                  </div>
                </div>
              </div>

              {/* Ideal For Tags */}
              <div className="mb-6">
                <p className="text-sm text-[var(--text-secondary)] mb-2">Ideal For:</p>
                <div className="flex flex-wrap gap-2">
                  {product.idealFor.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--herbal-green)]/10 text-[var(--herbal-green)] rounded-full text-sm font-medium"
                    >
                      <Users size={14} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-wrap items-center gap-4 mb-6" ref={mainButtonRef}>
                <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(quantity + 1, activeStock))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={activeStock <= 0}
                  className="flex-1 sm:flex-none py-3 px-8 text-lg shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                  icon={isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
                >
                  {isAdded ? 'Added to Cart' : activeStock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>

              {/* View Ingredients Button */}
              <button
                onClick={() => setShowLabelModal(true)}
                className="btn-outline w-full mb-6"
              >
                View Complete Ingredients
              </button>

              {/* Ingredients Preview */}
              <div className="bg-[var(--parchment-dark)] rounded-xl p-4">
                <p className="text-sm text-[var(--text-secondary)] mb-1">Ingredients:</p>
                <p className="text-[var(--text-primary)] leading-relaxed">{product.ingredients}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor's Note Section */}
      <section className="section bg-[var(--parchment)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 bg-[var(--riverbelt-blue)]/10 text-[var(--riverbelt-blue)] px-4 py-2 rounded-full text-sm font-medium mb-4 border border-[var(--riverbelt-blue)]/20">
                <Award size={16} />
                Why Dr. Mohini Formulated This
              </span>
            </div>

            <div className="doctors-note text-lg relative">
              <span className="absolute -top-6 -left-4 text-6xl text-[var(--premium-gold)] opacity-50 font-serif">&ldquo;</span>
              {product.doctorNote}
              <div className="mt-8 flex items-center justify-center gap-4 pt-6 border-t border-[var(--premium-gold)]/20">
                <div className="w-14 h-14 rounded-full bg-[var(--riverbelt-blue)] flex items-center justify-center text-white shadow-md border-2 border-white">
                  <span className="font-bold text-xl">Dr</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-[var(--text-primary)] text-lg">
                    Dr. Mohini Zate
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    BAMS, MPH-N | Founder & Chief Formulator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-[var(--herbal-green)] text-center mb-8 flex items-center justify-center gap-2">
              <Clock size={28} />
              How to Use
            </h2>

            <div className="grid sm:grid-cols-3 gap-6">
              {product.howToUse.map((step, index) => {
                const Icon = howToUseIcons[step.icon] || Leaf;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                  >
                    <div className="w-14 h-14 mx-auto rounded-full bg-[var(--herbal-green)]/10 flex items-center justify-center mb-4 text-[var(--herbal-green)]">
                      <Icon size={28} />
                    </div>
                    <p className="text-[var(--text-primary)] font-medium leading-relaxed">{step.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Nutrition Table */}
      <section className="section bg-[var(--parchment-dark)] mb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-[var(--herbal-green)] text-center mb-8">
              Nutrition Information
            </h2>

            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-[var(--herbal-green)]/20">
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--herbal-green)] text-white">
                    <th className="px-6 py-4 text-left font-semibold">Nutrient</th>
                    <th className="px-6 py-4 text-right font-semibold">Per Serving ({product.nutrition.servingSize})</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(product.nutrition)
                    .filter(([key]) => key !== 'servingSize')
                    .map(([key, value], index) => (
                      <tr
                        key={key}
                        className={index % 2 === 0 ? 'bg-[var(--parchment)]' : 'bg-white'}
                      >
                        <td className="px-6 py-3 text-[var(--text-primary)] capitalize font-medium">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </td>
                        <td className="px-6 py-3 text-right font-bold text-[var(--text-primary)]">
                          {value}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-xs text-[var(--text-light)] mt-4">*Approximate values</p>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar for Mobile */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-40 lg:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)] transition-transform duration-300 ${
          isStickyVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center gap-3">
             <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                 <Image src={selectedVariant?.image_url || product.image} alt={product.name} fill className="object-cover" />
             </div>
             <div className="flex-1 min-w-0">
                 <p className="text-sm font-semibold truncate">{product.name}</p>
                 <p className="text-lg font-bold text-[var(--herbal-green)]">₹{activePrice}</p>
             </div>
             <Button 
                onClick={handleAddToCart}
                disabled={activeStock <= 0}
                size="md"
                className="shadow-md"
                icon={isAdded ? <Check size={18} /> : undefined}
             >
                {isAdded ? 'Added' : 'Add'}
             </Button>
        </div>
      </div>

      {/* Transparent Label Modal */}
      {showLabelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLabelModal(false)}
          />
          <div className="relative bg-[var(--parchment)] max-w-lg w-full rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--text-primary)]">
                Complete Product Label
              </h3>
              <button
                onClick={() => setShowLabelModal(false)}
                className="p-2 hover:bg-white rounded-full transition-colors text-gray-500 hover:text-red-500"
              >
                <span className="sr-only">Close</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-[var(--premium-gold)] relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 bg-[var(--premium-gold)] text-[var(--text-primary)] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  Authentic Ayurvedic
              </div>

              <div className="text-center mb-6 pb-4 border-b border-gray-100">
                <h4 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--riverbelt-blue)] mb-1">
                  {product.name}
                </h4>
                <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                  Net Qty: {activeNetQty}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h5 className="font-bold text-[var(--text-primary)] text-sm uppercase tracking-wide mb-2">Ingredients</h5>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic border-l-2 border-[var(--herbal-green)] pl-3">
                    {product.ingredients}
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-[var(--text-primary)] text-sm uppercase tracking-wide mb-2">Nutrition Facts</h5>
                  <div className="text-sm space-y-1 bg-[var(--parchment-cream)] p-3 rounded-lg">
                    {Object.entries(product.nutrition).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-gray-200 last:border-0 py-1.5">
                        <span className="text-[var(--text-primary)] capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-bold font-mono">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <p className="text-xs text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Storage:</strong> Store in a cool, dry place away from direct sunlight. Close lid tightly after use.
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Manufacturer:</strong> HerbalGold Farmer Producer Company, Godavari Riverbelt Region, Maharashtra, India
                  </p>
                </div>

                <div className="text-center pt-2">
                  <div className="inline-flex items-center gap-2 text-[var(--herbal-green)] bg-[var(--herbal-green-50)] px-3 py-1 rounded-full border border-[var(--herbal-green-100)]">
                    <Check size={14} strokeWidth={3} />
                    <span className="text-xs font-bold uppercase tracking-wide">FSSAI Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
