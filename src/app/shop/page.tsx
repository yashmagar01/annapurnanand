'use client';

import { useState, useEffect } from 'react';
import { Filter, Loader2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { createClient } from '@/lib/supabase/client';
import { Product } from '@/lib/database.types';
import PageHeader from '@/components/PageHeader';

const CATEGORIES = [
  { id: 'powder', name: 'Powder' },
  { id: 'capsules', name: 'Capsules' },
  { id: 'tablets', name: 'Tablets' },
];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const supabase = createClient();

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }
    
    fetchProducts();
  }, [supabase]);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: 'Shop' }]} />
        </div>
      </div>

      {/* Page Header */}
      <PageHeader 
        title="Our Products" 
        description="Discover our complete range of Moringa-based nutrition, each product formulated with care by Dr. Mohini Zate."
      />

      {/* Shop Content */}
      <section className="section">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Filter size={18} />
              <span className="font-medium">Filter by:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-[var(--herbal-green)] text-white'
                    : 'bg-[var(--parchment-dark)] text-[var(--text-primary)] hover:bg-[var(--herbal-green)]/10'
                }`}
              >
                All Products
              </button>
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-[var(--herbal-green)] text-white'
                      : 'bg-[var(--parchment-dark)] text-[var(--text-primary)] hover:bg-[var(--herbal-green)]/10'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin text-[var(--herbal-green)]" size={40} />
            </div>
          )}

          {/* Results Count */}
          {!loading && (
            <p className="text-[var(--text-secondary)] mb-6">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          )}

          {/* Products Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  name={product.name}
                  shortDescription={product.short_description || ''}
                  price={product.price}
                  originalPrice={product.original_price || undefined}
                  image={product.image || '/images/products/placeholder.jpg'}
                  netQty={product.net_qty || ''}
                  category={product.category}
                  idealFor={product.ideal_for || undefined}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[var(--text-secondary)] text-lg">
                No products found in this category.
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="btn-herbal mt-4"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
