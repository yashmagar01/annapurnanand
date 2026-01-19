'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Product } from '@/context/AdminContext';

interface EditProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (updates: Partial<Product>) => void;
}

export default function EditProductModal({
  isOpen,
  product,
  onClose,
  onSave,
}: EditProductModalProps) {
  const [formData, setFormData] = useState({
    price: 0,
    original_price: 0,
    net_qty: '',
    short_description: '',
    stock: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        price: product.price,
        original_price: product.original_price || product.price,
        net_qty: product.net_qty || '',
        short_description: product.short_description || '',
        stock: product.stock || 0,
      });
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      price: Number(formData.price),
      original_price: Number(formData.original_price),
      net_qty: formData.net_qty,
      short_description: formData.short_description,
      stock: Number(formData.stock),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 animate-scale-in max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Edit Product</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">{product.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Selling Price (₹)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none text-lg font-semibold"
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                MRP (₹)
              </label>
              <input
                type="number"
                value={formData.original_price}
                onChange={(e) => setFormData({ ...formData, original_price: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none"
                min={0}
              />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none"
              min={0}
            />
            {formData.stock < 10 && (
              <p className="text-red-500 text-sm mt-1">⚠️ Low stock warning</p>
            )}
          </div>

          {/* Net Qty */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Net Quantity (e.g., "100g", "60 Capsules")
            </label>
            <input
              type="text"
              value={formData.net_qty}
              onChange={(e) => setFormData({ ...formData, net_qty: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Short Description
            </label>
            <textarea
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg border border-gray-200 text-[var(--text-secondary)] font-medium hover:bg-gray-50 transition-colors min-h-[48px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-[var(--herbal-green)] text-white font-medium hover:bg-[var(--herbal-green-dark)] transition-colors min-h-[48px]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
