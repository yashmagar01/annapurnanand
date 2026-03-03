import { ShieldCheck, Waves, Stethoscope, Tractor } from 'lucide-react';

const pillars = [
  {
    icon: ShieldCheck,
    label: 'FSSAI Licensed',
    sub: 'Certified Food-Grade',
    color: 'text-[var(--herbal-green)]',
    bg: 'bg-[var(--herbal-green-50)]',
  },
  {
    icon: Waves,
    label: 'Godavari Sourced',
    sub: 'Riverbelt Mineral-Rich Soil',
    color: 'text-[var(--riverbelt-blue)]',
    bg: 'bg-[var(--riverbelt-blue-50)]',
  },
  {
    icon: Stethoscope,
    label: 'Doctor Formulated',
    sub: 'BAMS · MPH-N Credentials',
    color: 'text-[var(--premium-gold-dark)]',
    bg: 'bg-[var(--premium-gold-50)]',
  },
  {
    icon: Tractor,
    label: '500+ Farmers',
    sub: 'HerbalGold FPC Network',
    color: 'text-[var(--herbal-green-dark)]',
    bg: 'bg-[var(--herbal-green-50)]',
  },
];

export default function TrustBar() {
  return (
    <div className="bg-white border-y border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-4 lg:py-5 group hover:bg-[var(--parchment)] transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-full ${pillar.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={20} className={pillar.color} />
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-bold ${pillar.color} truncate`}>{pillar.label}</p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">{pillar.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
