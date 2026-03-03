'use client';

import { useState } from 'react';
import {
  Clock, FlaskConical, Leaf, ShieldCheck,
  GlassWater, Blend, Wheat, Spade, Moon,
  Pill, Sun, Calendar, Heart, Zap, Bone, Eye,
  Droplets, Activity
} from 'lucide-react';

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

// ─── Icon map ───────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  glass: GlassWater, clock: Clock, leaf: Leaf, blender: Blend,
  fruit: Leaf, bowl: Wheat, wheat: Wheat, spoon: Spade, moon: Moon,
  capsule: Pill, pill: Pill, sun: Sun, calendar: Calendar, heart: Heart,
};

// Colour per step index — warm→cool progression feels intentional
const STEP_PALETTES = [
  { bg: 'bg-[var(--herbal-green)]',     text: 'text-white',   ring: 'ring-[var(--herbal-green-100)]',   label: 'text-[var(--herbal-green)]'   },
  { bg: 'bg-[var(--riverbelt-blue)]',   text: 'text-white',   ring: 'ring-[var(--riverbelt-blue-100)]', label: 'text-[var(--riverbelt-blue)]'  },
  { bg: 'bg-[var(--premium-gold-dark)]',text: 'text-white',   ring: 'ring-[var(--premium-gold-100)]',   label: 'text-[var(--premium-gold-dark)]'},
];

// ─── Nutrition helpers ──────────────────────────────────────────────────────
// extract numeric DV% from strings like "2.1mg (12% DV)"
function extractDV(val: string): number | null {
  const m = val.match(/\((\d+)%/);
  return m ? parseInt(m[1]) : null;
}

// Pick an icon and colour for each nutrient key
const NUTRIENT_META: Record<string, { Icon: React.ComponentType<any>; color: string; bg: string }> = {
  energy:     { Icon: Zap,       color: 'text-amber-500',             bg: 'bg-amber-50' },
  protein:    { Icon: Activity,  color: 'text-[var(--herbal-green)]', bg: 'bg-[var(--herbal-green-50)]' },
  carbohydrates: { Icon: Wheat,  color: 'text-orange-400',            bg: 'bg-orange-50' },
  fiber:      { Icon: Leaf,      color: 'text-green-500',             bg: 'bg-green-50' },
  iron:       { Icon: Droplets,  color: 'text-red-400',               bg: 'bg-red-50' },
  calcium:    { Icon: Bone,      color: 'text-[var(--riverbelt-blue)]',bg: 'bg-[var(--riverbelt-blue-50)]'},
  vitaminA:   { Icon: Eye,       color: 'text-yellow-500',            bg: 'bg-yellow-50' },
  magnesium:  { Icon: Zap,       color: 'text-purple-400',            bg: 'bg-purple-50' },
  phosphorus: { Icon: Activity,  color: 'text-teal-500',              bg: 'bg-teal-50' },
  sodium:     { Icon: Droplets,  color: 'text-blue-400',              bg: 'bg-blue-50' },
};
const DEFAULT_META = { Icon: FlaskConical, color: 'text-gray-500', bg: 'bg-gray-50' };

function humanizeKey(key: string) {
  return key.replace(/([A-Z])/g, ' $1').trim()
            .replace(/^./, s => s.toUpperCase());
}

// ─── Components ─────────────────────────────────────────────────────────────
const TABS = [
  { id: 'howToUse',    label: 'Daily Routine', icon: Clock },
  { id: 'nutrition',   label: 'Nutrition',      icon: FlaskConical },
  { id: 'ingredients', label: 'Ingredients',    icon: Leaf },
];

export default function ProductEducationTabs({ product, howToUseIcons }: ProductEducationTabsProps) {
  const [activeTab, setActiveTab] = useState<'howToUse' | 'nutrition' | 'ingredients'>('howToUse');

  // Pre-process nutrition entries
  const nutritionEntries = Object.entries(product.nutrition)
    .filter(([key, val]) => key !== 'servingSize' && val !== undefined) as [string, string][];

  // Split ingredients string into individual chips
  const ingredientChips = product.ingredients.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <section className="bg-[var(--parchment)] py-16">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* ── Tab Bar ─────────────────────────────────────────────── */}
        <div className="flex bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 mb-10 gap-1">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  active
                    ? 'bg-[var(--herbal-green)] text-white shadow-md shadow-[var(--herbal-green)]/20'
                    : 'text-[var(--text-secondary)] hover:text-[var(--herbal-green)] hover:bg-[var(--herbal-green-50)]'
                }`}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Panels ──────────────────────────────────────────────── */}
        <div className="animate-fade-in-up" key={activeTab}>

          {/* ===== HOW TO USE — Daily Routine Timeline ===== */}
          {activeTab === 'howToUse' && (
            <div>
              {/* Header */}
              <div className="text-center mb-10">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--herbal-green)] mb-2">
                  Build Your
                </p>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  Daily Nutrition Habit
                </h3>
                <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto">
                  Just a few moments a day — consistency is where the transformation happens.
                </p>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Connecting dotted line — desktop horizontal */}
                <div className="hidden sm:block absolute top-[52px] left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-[var(--herbal-green)]/20 z-0" />

                <div className="grid sm:grid-cols-3 gap-6 sm:gap-4 relative z-10">
                  {product.howToUse.map((step, index) => {
                    const Icon = howToUseIcons[step.icon] || ICON_MAP[step.icon] || Leaf;
                    const palette = STEP_PALETTES[index % STEP_PALETTES.length];

                    return (
                      <div key={index} className="flex flex-col items-center text-center group">
                        {/* Icon circle */}
                        <div className={`relative w-[104px] h-[104px] rounded-full ${palette.bg} flex items-center justify-center mb-5 ring-8 ${palette.ring} shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                          {/* Step number badge */}
                          <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white border-2 border-[var(--parchment-dark)] flex items-center justify-center shadow-sm">
                            <span className={`text-xs font-black ${palette.label}`}>{index + 1}</span>
                          </div>
                          <Icon size={40} className={palette.text} />
                        </div>

                        {/* Card */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 w-full group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
                          <p className="text-[var(--text-primary)] font-medium leading-relaxed text-sm">
                            {step.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Habit callout */}
              <div className="mt-8 bg-gradient-to-r from-[var(--herbal-green-50)] to-[var(--riverbelt-blue-50)] rounded-2xl p-5 flex items-start gap-4 border border-[var(--herbal-green-100)]">
                <div className="w-10 h-10 rounded-full bg-[var(--herbal-green)] flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-[var(--text-primary)] text-sm mb-1">The 21-Day Habit Rule</p>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    Most customers report feeling a noticeable difference in energy and digestion within <strong>3 weeks</strong> of consistent daily use. Track your journey — your body will show the results.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ===== NUTRITION — Visual Bar Chart ===== */}
          {activeTab === 'nutrition' && (
            <div>
              {/* Header */}
              <div className="text-center mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--herbal-green)] mb-2">
                  Per Serving · {product.nutrition.servingSize}
                </p>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
                  What Every Serving Delivers
                </h3>
              </div>

              <div className="grid gap-3">
                {nutritionEntries.map(([key, value], index) => {
                  const dv = extractDV(value);
                  const meta = NUTRIENT_META[key] || DEFAULT_META;
                  const { Icon, color, bg } = meta;
                  // For the bar fill — cap at 100%
                  const fillPct = dv !== null ? Math.min(dv, 100) : null;

                  return (
                    <div
                      key={key}
                      className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
                    >
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={20} className={color} />
                      </div>

                      {/* Label + bar */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-semibold text-[var(--text-primary)]">
                            {humanizeKey(key)}
                          </span>
                          <span className={`text-sm font-bold ${color}`}>{value}</span>
                        </div>

                        {fillPct !== null ? (
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ease-out ${
                                fillPct >= 30 ? 'bg-[var(--herbal-green)]'
                                : fillPct >= 10 ? 'bg-[var(--riverbelt-blue)]'
                                : 'bg-[var(--premium-gold)]'
                              }`}
                              style={{ width: `${fillPct}%` }}
                            />
                          </div>
                        ) : (
                          /* No DV% — just a subtle placeholder bar at 100% filled with muted grey */
                          <div className="h-1.5 bg-gray-100 rounded-full" />
                        )}
                      </div>

                      {/* DV% badge */}
                      {dv !== null && (
                        <div className={`flex-shrink-0 text-center px-2 py-1 rounded-lg ${bg} min-w-[48px]`}>
                          <p className={`text-xs font-black ${color}`}>{dv}%</p>
                          <p className="text-[9px] text-gray-400 font-medium leading-none mt-0.5">DV</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* FSSAI footnote */}
              <p className="text-center text-xs text-[var(--text-light)] mt-5 flex items-center justify-center gap-1.5">
                <ShieldCheck size={13} className="text-[var(--herbal-green)]" />
                Approximate values. DV = % Daily Value based on a 2,000 kcal diet. FSSAI regulated.
              </p>
            </div>
          )}

          {/* ===== INGREDIENTS — Chip Tags ===== */}
          {activeTab === 'ingredients' && (
            <div>
              {/* Header */}
              <div className="text-center mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--herbal-green)] mb-2">
                  100% Transparent
                </p>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
                  Every Ingredient, Named
                </h3>
                <p className="text-[var(--text-secondary)] text-sm mt-2">
                  No hidden fillers. No artificial additives. What you see is what you get.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                {/* Ingredient chips */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {ingredientChips.map((chip, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 bg-[var(--herbal-green-50)] border border-[var(--herbal-green-100)] text-[var(--herbal-green-dark)] text-sm font-medium px-4 py-2 rounded-full hover:bg-[var(--herbal-green)] hover:text-white hover:border-[var(--herbal-green)] transition-all duration-200 cursor-default"
                    >
                      <Leaf size={13} className="flex-shrink-0" />
                      {chip}
                    </span>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 my-6" />

                {/* Quality promises */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: ShieldCheck, label: '100% Natural', sub: 'No synthetic ingredients', color: 'text-[var(--herbal-green)]', bg: 'bg-[var(--herbal-green-50)]' },
                    { icon: Leaf,        label: 'No Additives', sub: 'No preservatives or fillers', color: 'text-[var(--riverbelt-blue)]', bg: 'bg-[var(--riverbelt-blue-50)]' },
                    { icon: Heart,       label: 'FSSAI Certified', sub: 'Food-grade processing', color: 'text-[var(--premium-gold-dark)]', bg: 'bg-[var(--premium-gold-50)]' },
                  ].map(({ icon: Icon, label, sub, color, bg }) => (
                    <div key={label} className={`flex items-start gap-3 ${bg} rounded-xl p-4`}>
                      <Icon size={20} className={`${color} flex-shrink-0 mt-0.5`} />
                      <div>
                        <p className={`font-bold text-sm ${color}`}>{label}</p>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Source note */}
                <div className="mt-6 flex items-start gap-3 border-t border-gray-100 pt-6">
                  <div className="w-8 h-8 rounded-full bg-[var(--parchment-dark)] flex items-center justify-center flex-shrink-0">
                    <span className="text-base">🌊</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    <span className="font-semibold text-[var(--text-primary)]">Origin:</span>{' '}
                    All Moringa-based ingredients are sourced exclusively from the <span className="font-semibold text-[var(--riverbelt-blue)]">Godavari Riverbelt</span>, HerbalGold Farmer Producer Company — batch-traceable from farm to packet.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
