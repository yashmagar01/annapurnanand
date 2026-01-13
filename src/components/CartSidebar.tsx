'use client';

import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[var(--parchment)]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-[var(--herbal-green)]" size={24} />
            <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--text-primary)]">
              Your Cart
            </h2>
            <span className="bg-[var(--premium-gold)] text-[var(--text-primary)] text-sm font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-white rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={24} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={64} className="text-gray-200 mb-4" />
              <h3 className="font-[family-name:var(--font-heading)] text-xl text-[var(--text-primary)] mb-2">
                Your cart is empty
              </h3>
              <p className="text-[var(--text-secondary)] text-sm mb-6">
                Discover our range of Moringa-based nutrition products
              </p>
              <Link
                href="/shop"
                onClick={() => setIsCartOpen(false)}
                className="btn-herbal"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-[var(--parchment)] rounded-lg"
                >
                  {/* Product Image Placeholder */}
                  <div className="w-20 h-20 bg-gradient-to-br from-[var(--herbal-green-light)]/20 to-[var(--riverbelt-blue-light)]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🌿</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[var(--text-primary)] text-sm line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      {item.netQty}
                    </p>
                    <p className="text-[var(--herbal-green)] font-bold mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-[var(--text-light)] hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-gray-100 transition-colors rounded-l-lg"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-gray-100 transition-colors rounded-r-lg"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-white">
            {/* Free Shipping Notice */}
            {totalPrice < 499 && (
              <div className="mb-4 p-3 bg-[var(--premium-gold)]/10 rounded-lg text-center">
                <p className="text-sm text-[var(--text-primary)]">
                  Add <strong>₹{499 - totalPrice}</strong> more for{' '}
                  <span className="text-[var(--herbal-green)] font-semibold">FREE shipping!</span>
                </p>
              </div>
            )}

            {/* Subtotal */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-[var(--text-secondary)]">Subtotal</span>
              <span className="text-2xl font-bold text-[var(--text-primary)]">
                ₹{totalPrice}
              </span>
            </div>

            {/* Checkout Button */}
            <button className="w-full btn-gold py-3 text-base">
              Proceed to Checkout
            </button>

            <Link
              href="/shop"
              onClick={() => setIsCartOpen(false)}
              className="block text-center text-sm text-[var(--herbal-green)] font-medium mt-3 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
