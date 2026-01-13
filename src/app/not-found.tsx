import Link from 'next/link';
import { Home, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[var(--parchment)]">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <span className="text-9xl">🌿</span>
            <h1 className="font-[family-name:var(--font-heading)] text-6xl font-bold text-[var(--riverbelt-blue)] mt-4">
              404
            </h1>
          </div>

          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] mb-4">
            Page Not Found
          </h2>

          <p className="text-[var(--text-secondary)] mb-8">
            It looks like this page has wandered off into the Riverbelt! 
            Let's get you back to familiar ground.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="btn-herbal">
              <Home size={18} />
              Go Home
            </Link>
            <Link href="/shop" className="btn-gold">
              <ShoppingBag size={18} />
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
