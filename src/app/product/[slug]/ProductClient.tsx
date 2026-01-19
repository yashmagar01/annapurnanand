'use client';

import { useState } from 'react';
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
  Heart
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import productsData from '@/data/products.json';

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

export default function ProductClient() {
  const params = useParams();
  const slug = params.slug as string;
  const [quantity, setQuantity] = useState(1);
  const [showLabelModal, setShowLabelModal] = useState(false);
  const { addItem } = useCart();

  const product = productsData.products.find(p => p.slug === slug);

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

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        netQty: product.netQty,
      });
    }
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
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
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[var(--herbal-green-light)]/20 to-[var(--riverbelt-blue-light)]/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Placeholder */}
                <div className="text-center">
                  <span className="text-9xl">🌿</span>
                  <p className="text-[var(--text-secondary)] mt-4">{product.name}</p>
                </div>

                {/* Discount Badge */}
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-[var(--premium-gold)] text-[var(--text-primary)] px-3 py-1.5 rounded-lg font-bold">
                    {discount}% OFF
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--herbal-green)]">
                  {product.category}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div>
              {/* Doctor Formulated Badge */}
              <div className="doctor-badge inline-flex mb-4">
                <Award size={14} />
                <span>Dr. Mohini's Formulation</span>
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
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-[var(--text-light)] line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="text-sm font-medium text-[var(--premium-gold)]">
                      Save ₹{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Key Details */}
              <div className="bg-[var(--parchment)] rounded-xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Net Quantity</p>
                    <p className="font-semibold text-[var(--text-primary)]">{product.netQty}</p>
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
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="btn-gold flex-1 sm:flex-none py-3 px-8 text-lg"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
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
                <p className="text-[var(--text-primary)]">{product.ingredients}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor's Note Section - Italic Serif Style */}
      <section className="section bg-[var(--parchment)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 bg-[var(--riverbelt-blue)]/10 text-[var(--riverbelt-blue)] px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Award size={16} />
                Why Dr. Mohini Formulated This
              </span>
            </div>

            <div className="doctors-note text-lg">
              {product.doctorNote}
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-[var(--premium-gold)]/30">
                <div className="w-12 h-12 rounded-full bg-[var(--riverbelt-blue)] flex items-center justify-center">
                  <Award size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--text-primary)] not-italic">
                    Dr. Mohini Zate
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] not-italic">
                    BAMS, MPH-N | Founder & Chief Formulator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-[var(--herbal-green)] text-center mb-8">
              How to Use
            </h2>

            <div className="grid sm:grid-cols-3 gap-6">
              {product.howToUse.map((step, index) => {
                const Icon = howToUseIcons[step.icon] || Leaf;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100"
                  >
                    <div className="w-14 h-14 mx-auto rounded-full bg-[var(--herbal-green)]/10 flex items-center justify-center mb-4">
                      <Icon size={28} className="text-[var(--herbal-green)]" />
                    </div>
                    <p className="text-[var(--text-primary)]">{step.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Nutrition Table */}
      <section className="section bg-[var(--parchment-dark)]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-[var(--herbal-green)] text-center mb-8">
              Nutrition Information
            </h2>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
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
                        <td className="px-6 py-3 text-[var(--text-primary)] capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </td>
                        <td className="px-6 py-3 text-right font-medium text-[var(--text-primary)]">
                          {value}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Label Modal */}
      {showLabelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowLabelModal(false)}
          />
          <div className="relative bg-[var(--parchment)] max-w-lg w-full rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--text-primary)]">
                Complete Product Label
              </h3>
              <button
                onClick={() => setShowLabelModal(false)}
                className="p-2 hover:bg-white rounded-full transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Label Content - Mimics back of pack */}
            <div className="bg-white rounded-xl p-6 border-2 border-[var(--premium-gold)]">
              <div className="text-center mb-4 pb-4 border-b border-gray-200">
                <h4 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--riverbelt-blue)]">
                  {product.name}
                </h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Net Qty: {product.netQty}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-[var(--text-primary)] mb-1">Ingredients</h5>
                  <p className="text-sm text-[var(--text-secondary)]">{product.ingredients}</p>
                </div>

                <div>
                  <h5 className="font-semibold text-[var(--text-primary)] mb-2">Nutrition Facts</h5>
                  <div className="text-sm space-y-1">
                    {Object.entries(product.nutrition).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-[var(--text-secondary)] capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-[var(--text-light)]">
                    <strong>Storage:</strong> Store in a cool, dry place away from direct sunlight.
                  </p>
                  <p className="text-xs text-[var(--text-light)] mt-2">
                    <strong>Manufacturer:</strong> HerbalGold Farmer Producer Company, Godavari Riverbelt Region, Maharashtra, India
                  </p>
                </div>

                <div className="text-center pt-4">
                  <div className="inline-flex items-center gap-2 text-[var(--herbal-green)]">
                    <Check size={16} />
                    <span className="text-sm font-medium">FSSAI Licensed</span>
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
