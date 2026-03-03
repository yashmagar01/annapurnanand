'use client';

import { useState } from 'react';
import { Clock, FlaskConical, Leaf, ShieldCheck } from 'lucide-react';

type HowToUseStep = { icon: string; text: string };
type Nutrition = Record<string, string | undefined>;

interface Product {
  howToUse: HowToUseStep[];
  nutrition: Nutrition;
  ingredients: string;
  doctorNote: string;
}

interface ProductEducationTabsProps {
  product: Product;
  howToUseIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>>;
}

const TABS = [
  { id: 'howToUse', label: 'How to Use', icon: Clock },
  { id: 'nutrition', label: 'Nutrition', icon: FlaskConical },
  { id: 'ingredients', label: 'Ingredients', icon: Leaf },
];

export default function ProductEducationTabs({ product, howToUseIcons }: ProductEducationTabsProps) {
  const [activeTab, setActiveTab] = useState<'howToUse' | 'nutrition' | 'ingredients'>('howToUse');

  return (
    <section className="section-spacious bg-[var(--parchment)] pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          {/* Tab Buttons */}
          <div className="flex border-b border-gray-200 mb-8">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-all duration-200 -mb-px ${
                    isActive
                      ? 'border-[var(--herbal-green)] text-[var(--herbal-green)] bg-white rounded-t-lg'
                      : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--herbal-green)] hover:border-[var(--herbal-green)]/30'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Panels */}
          <div className="animate-fade-in-up">

            {/* === HOW TO USE === */}
            {activeTab === 'howToUse' && (
              <div>
                <p className="text-center text-[var(--text-secondary)] mb-8 text-base">
                  Build your <span className="font-semibold text-[var(--herbal-green)]">Daily Nutrition Habit</span> — follow these simple steps every day.
                </p>
                <div className="grid sm:grid-cols-3 gap-6">
                  {product.howToUse.map((step, index) => {
                    const Icon = howToUseIcons[step.icon] || Leaf;
                    return (
                      <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all">
                        <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-[var(--herbal-green-50)] to-[var(--herbal-green-100)] flex items-center justify-center mb-4 text-[var(--herbal-green)] shadow-inner">
                          <Icon size={26} />
                        </div>
                        <div className="w-6 h-6 rounded-full bg-[var(--herbal-green)] text-white text-xs font-bold flex items-center justify-center mx-auto mb-3">
                          {index + 1}
                        </div>
                        <p className="text-[var(--text-primary)] font-medium leading-relaxed text-sm">{step.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* === NUTRITION === */}
            {activeTab === 'nutrition' && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--herbal-green)]/20">
                  <div className="bg-gradient-to-r from-[var(--herbal-green)] to-[var(--herbal-green-dark)] text-white px-6 py-4 flex items-center justify-between">
                    <h3 className="font-[family-name:var(--font-heading)] font-bold">Nutrition Facts</h3>
                    <span className="text-sm text-white/80">Per serving: {product.nutrition.servingSize}</span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {Object.entries(product.nutrition)
                      .filter(([key, value]) => key !== 'servingSize' && value !== undefined)
                      .map(([key, value], index) => (
                        <div
                          key={key}
                          className={`flex justify-between items-center px-6 py-3 ${index % 2 === 0 ? 'bg-[var(--parchment)]' : 'bg-white'}`}
                        >
                          <span className="text-[var(--text-primary)] capitalize font-medium text-sm">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="font-bold text-[var(--herbal-green)] text-sm">{value}</span>
                        </div>
                      ))}
                  </div>
                </div>
                <p className="text-center text-xs text-[var(--text-light)] mt-4 flex items-center justify-center gap-1">
                  <ShieldCheck size={12} />
                  *Approximate values. FSSAI regulated analysis.
                </p>
              </div>
            )}

            {/* === INGREDIENTS === */}
            {activeTab === 'ingredients' && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[var(--herbal-green-50)] flex items-center justify-center">
                      <Leaf size={20} className="text-[var(--herbal-green)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">All Ingredients</h3>
                      <p className="text-xs text-[var(--text-secondary)]">Complete, transparent declaration</p>
                    </div>
                  </div>
                  <p className="text-[var(--text-primary)] leading-relaxed border-l-4 border-[var(--herbal-green)] pl-4 italic text-base">
                    {product.ingredients}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 bg-[var(--herbal-green-50)] text-[var(--herbal-green)] text-xs px-3 py-1.5 rounded-full font-semibold border border-[var(--herbal-green-100)]">
                      <ShieldCheck size={12} /> 100% Natural
                    </span>
                    <span className="inline-flex items-center gap-1 bg-[var(--herbal-green-50)] text-[var(--herbal-green)] text-xs px-3 py-1.5 rounded-full font-semibold border border-[var(--herbal-green-100)]">
                      <ShieldCheck size={12} /> No Artificial Additives
                    </span>
                    <span className="inline-flex items-center gap-1 bg-[var(--herbal-green-50)] text-[var(--herbal-green)] text-xs px-3 py-1.5 rounded-full font-semibold border border-[var(--herbal-green-100)]">
                      <ShieldCheck size={12} /> FSSAI Certified
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
