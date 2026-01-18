import * as React from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string; // Add href support
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      icon,
      iconPosition = 'left',
      children,
      disabled,
      href,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variants
    const variants = {
      primary:
        'bg-[var(--herbal-green)] text-white hover:bg-[var(--herbal-green-dark)] shadow-sm hover:shadow-md focus:ring-[var(--herbal-green)] border border-transparent',
      secondary:
        'bg-transparent border border-[var(--herbal-green)] text-[var(--herbal-green)] hover:bg-[var(--herbal-green-50)] focus:ring-[var(--herbal-green)]',
      tertiary:
        'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline focus:ring-gray-400 p-0 h-auto',
      destructive:
        'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 focus:ring-red-500 border border-transparent',
      ghost:
        'bg-transparent text-[var(--text-secondary)] hover:bg-gray-100 focus:ring-gray-400',
    };

    // Sizes
    const sizes = {
      sm: 'text-sm px-3.5 py-1.5 gap-1.5',
      md: 'text-base px-6 py-2.5 gap-2',
      lg: 'text-lg px-8 py-3.5 gap-2.5',
    };

    // Compounded styles
    const styles = cn(
      baseStyles,
      variants[variant],
      variant !== 'tertiary' && sizes[size],
      fullWidth && 'w-full',
      className
    );

    const content = (
      <>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && icon && iconPosition === 'left' && icon}
        {children}
        {!isLoading && icon && iconPosition === 'right' && icon}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={styles}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={styles}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
