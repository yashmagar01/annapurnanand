'use client';

import { X, Plus, Minus, Trash2, ShoppingBag, Truck, ArrowRight, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 499;
  const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - totalPrice, 0);
  const shippingCost = remainingForFreeShipping === 0 ? 0 : 49;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white z-[70] shadow-2xl flex flex-col animate-slide-in-right transform transition-transform duration-300">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[var(--parchment-cream)] relative overflow-hidden">
          {/* Decorative Pattern Background */}
           <div className="absolute inset-0 opacity-30 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, var(--premium-gold-200) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
           </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-white p-2 rounded-full shadow-sm">
                <ShoppingBag className="text-[var(--herbal-green)]" size={20} />
            </div>
            <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--text-primary)]">
                  Your Cart
                </h2>
                <p className="text-xs text-[var(--text-secondary)] font-medium">
                    {totalItems} item{totalItems !== 1 ? 's' : ''}
                </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-white rounded-full transition-colors relative z-10 hover:shadow-md"
            aria-label="Close cart"
          >
            <X size={20} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {items.length > 0 && (
            <div className="px-5 py-4 bg-white border-b border-gray-50">
               {remainingForFreeShipping > 0 ? (
                   <div className="flex flex-col gap-2">
                       <p className="text-sm text-[var(--text-primary)] font-medium">
                           Add <span className="text-[var(--herbal-green)] font-bold">₹{remainingForFreeShipping}</span> for <span className="font-bold">FREE Shipping</span>
                       </p>
                       <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                           <div 
                             className="h-full bg-gradient-to-r from-[var(--herbal-green-light)] to-[var(--herbal-green)] rounded-full transition-all duration-500 ease-out relative"
                             style={{ width: `${progress}%` }}
                           >
                               <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-[shimmer_2s_infinite]"></div>
                           </div>
                       </div>
                   </div>
               ) : (
                   <div className="flex items-center gap-3 p-3 bg-[var(--herbal-green-50)] border border-[var(--herbal-green-100)] rounded-xl animate-fade-in-up">
                       <div className="w-8 h-8 rounded-full bg-[var(--herbal-green)] flex items-center justify-center text-white flex-shrink-0">
                           <Truck size={14} />
                       </div>
                       <p className="text-sm text-[var(--herbal-green-dark)] font-semibold">
                           Yay! You've unlocked FREE Shipping
                       </p>
                   </div>
               )}
            </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="w-24 h-24 bg-[var(--parchment)] rounded-full flex items-center justify-center mb-6">
                 <ShoppingBag size={40} className="text-[var(--text-light)] opacity-50" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] mb-2">
                Your cart is empty
              </h3>
              <p className="text-[var(--text-secondary)] text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                Looks like you haven't added any wellness products yet.
              </p>
              <Button
                href="/shop"
                onClick={() => setIsCartOpen(false)}
                className="btn-herbal px-8"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group flex gap-4 p-3 bg-white border border-gray-100 rounded-xl hover:border-[var(--herbal-green-200)] hover:shadow-sm transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0 bg-[var(--parchment)]">
                    <Image
                         src={item.image}
                         alt={item.name}
                         fill
                         className="object-cover"
                         sizes="96px"
                         onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                     {/* Fallback */}
                     <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--herbal-green-light)]/20 to-[var(--riverbelt-blue-light)]/20 flex items-center justify-center">
                       <span className="text-2xl">🌿</span>
                     </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div>
                        <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-[var(--text-primary)] text-sm line-clamp-2 leading-tight">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors -mt-1 -mr-1"
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium bg-[var(--parchment-dark)] inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-wide">
                          {item.netQty}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 border border-gray-200 rounded-lg h-8">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-full flex items-center justify-center hover:bg-gray-50 rounded-l-lg text-gray-500 transition-colors disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-semibold w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-full flex items-center justify-center hover:bg-gray-50 rounded-r-lg text-gray-500 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-[var(--text-primary)] font-bold">
                          ₹{item.price * item.quantity}
                        </p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.03)] z-50">
            {/* Subtotal */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[var(--text-secondary)]">Subtotal</span>
                  <span className="font-semibold text-[var(--text-primary)]">
                    ₹{totalPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-[var(--text-secondary)]">Shipping</span>
                   <span className={shippingCost === 0 ? 'text-[var(--herbal-green)] font-bold' : 'text-[var(--text-primary)] font-semibold'}>
                     {remainingForFreeShipping === 0 ? 'FREE' : 'Calculated at checkout'}
                   </span>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-gold w-full flex items-center justify-between group py-4"
                >
                  <span className="font-bold">Checkout</span>
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg">
                      <span className="font-bold">₹{totalPrice}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center text-sm text-[var(--text-secondary)] font-medium hover:text-[var(--herbal-green)] transition-colors py-2"
                >
                  Continue Shopping
                </button>
            </div>
          </div>
        )}
      </div>
      
      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}
