'use client';

import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Search, Filter, Edit2, Trash2, Plus, Package, AlertTriangle } from 'lucide-react';
import EditProductModal from '@/components/admin/EditProductModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Product } from '@/context/AdminContext';

export default function ProductsPage() {
  const { products, updateProduct, deleteProduct } = useAdmin();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  
  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  
  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSaveProduct = (updates: Partial<Product>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, updates);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingProduct) {
      deleteProduct(deletingProduct.id);
      setDeletingProduct(null);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-heading)]">
            Product Management
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Manage your product catalog, prices, and inventory.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--herbal-green)] text-white rounded-lg font-medium hover:bg-[var(--herbal-green-dark)] transition-colors min-h-[48px]">
          <Plus size={20} />
          Add New Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)]" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none"
          />
        </div>
        
        {/* Category Filter */}
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)]" size={20} />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="pl-12 pr-8 py-3 rounded-lg border border-gray-200 focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none appearance-none bg-white min-w-[180px]"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--parchment-dark)] border-b border-gray-200">
                <th className="text-left px-6 py-4 font-semibold text-[var(--text-primary)]">Product</th>
                <th className="text-left px-6 py-4 font-semibold text-[var(--text-primary)]">Category</th>
                <th className="text-left px-6 py-4 font-semibold text-[var(--text-primary)]">Price</th>
                <th className="text-left px-6 py-4 font-semibold text-[var(--text-primary)]">Stock</th>
                <th className="text-left px-6 py-4 font-semibold text-[var(--text-primary)]">Net Qty</th>
                <th className="text-right px-6 py-4 font-semibold text-[var(--text-primary)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const isLowStock = (product.stock || 0) < 10;
                
                return (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-[var(--parchment)]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[var(--herbal-green-50)] flex items-center justify-center">
                          <Package className="text-[var(--herbal-green)]" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">{product.name}</p>
                          <p className="text-sm text-[var(--text-secondary)] line-clamp-1">{product.shortDescription}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-[var(--riverbelt-blue-50)] text-[var(--riverbelt-blue)] rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-[var(--herbal-green)]">₹{product.price}</p>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <p className="text-sm text-[var(--text-light)] line-through">₹{product.originalPrice}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {isLowStock && <AlertTriangle size={16} className="text-red-500" />}
                        <span className={`font-medium ${isLowStock ? 'text-red-500' : 'text-[var(--text-primary)]'}`}>
                          {product.stock || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">
                      {product.netQty}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="p-2 hover:bg-[var(--herbal-green-50)] rounded-lg transition-colors group"
                          title="Edit Product"
                        >
                          <Edit2 size={18} className="text-[var(--text-secondary)] group-hover:text-[var(--herbal-green)]" />
                        </button>
                        <button
                          onClick={() => setDeletingProduct(product)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                          title="Delete Product"
                        >
                          <Trash2 size={18} className="text-[var(--text-secondary)] group-hover:text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto text-[var(--text-light)]" size={48} />
            <p className="text-[var(--text-secondary)] mt-4">No products found</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <EditProductModal
        isOpen={!!editingProduct}
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleSaveProduct}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingProduct}
        title="Delete Product"
        message={`Are you sure you want to delete "${deletingProduct?.name}"? This action cannot be undone.`}
        confirmLabel="Yes, Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingProduct(null)}
        variant="danger"
      />
    </div>
  );
}
