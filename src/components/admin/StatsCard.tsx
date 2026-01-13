import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  variant = 'default',
}: StatsCardProps) {
  const variantStyles = {
    default: {
      bg: 'bg-white',
      iconBg: 'bg-[var(--riverbelt-blue-50)]',
      iconColor: 'text-[var(--riverbelt-blue)]',
    },
    success: {
      bg: 'bg-white',
      iconBg: 'bg-[var(--herbal-green-50)]',
      iconColor: 'text-[var(--herbal-green)]',
    },
    warning: {
      bg: 'bg-white',
      iconBg: 'bg-[var(--premium-gold-50)]',
      iconColor: 'text-[var(--premium-gold-dark)]',
    },
    danger: {
      bg: 'bg-red-50',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={`${styles.bg} rounded-xl p-6 shadow-sm border border-gray-100`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-[var(--text-primary)]">
            {value}
          </p>
          {trend && (
            <p className={`text-sm mt-2 font-medium ${
              trend.positive ? 'text-[var(--herbal-green)]' : 'text-red-500'
            }`}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${styles.iconBg} flex items-center justify-center`}>
          <Icon size={24} className={styles.iconColor} />
        </div>
      </div>
    </div>
  );
}
