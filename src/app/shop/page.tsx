'use client';

import { useState } from 'react';
import { Filter } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

const { products, categories } = productsData;

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
      <section className="bg-gradient-to-r from-[var(--herbal-green)] to-[var(--riverbelt-blue)] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-bold mb-4 text-[var(--premium-gold)]" style={{ textShadow: '0 2px 15px rgba(212,175,55,0.3)' }}>
              Our Products
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover our complete range of Moringa-based nutrition, each product formulated 
              with care by Dr. Mohini Zate.
            </p>
          </div>
        </div>
      </section>

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
              {categories.map((category) => (
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

          {/* Results Count */}
          <p className="text-[var(--text-secondary)] mb-6">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                shortDescription={product.shortDescription}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                netQty={product.netQty}
                category={product.category}
                idealFor={product.idealFor}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
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
