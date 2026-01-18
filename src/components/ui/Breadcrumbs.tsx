import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm text-[var(--text-secondary)] py-2", className)}>
       <Link href="/" className="hover:text-[var(--herbal-green)] transition-colors flex items-center gap-1">
         <Home size={14} />
         <span className="sr-only">Home</span>
       </Link>
       {items.map((item, index) => (
         <div key={index} className="flex items-center">
           <ChevronRight size={14} className="mx-2 text-[var(--text-light)]" />
           {item.href ? (
             <Link href={item.href} className="hover:text-[var(--herbal-green)] transition-colors">
               {item.label}
             </Link>
           ) : (
             <span className="font-medium text-[var(--text-primary)]" aria-current="page">
               {item.label}
             </span>
           )}
         </div>
       ))}
    </nav>
  );
}
