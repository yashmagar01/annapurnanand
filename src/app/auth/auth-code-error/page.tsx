'use client';

import Link from 'next/link';
import { AlertCircle, ArrowLeft, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--parchment)] to-[var(--parchment-dark)] py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--herbal-green)] to-[var(--riverbelt-blue)] flex items-center justify-center shadow-lg">
              <Leaf className="text-white" size={28} />
            </div>
            <span className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[var(--riverbelt-blue)]">
              ANNAPURNANAND
            </span>
          </Link>
        </div>

        {/* Error Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertCircle className="text-red-600" size={32} />
          </div>
          
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] mb-2">
            Authentication Error
          </h1>
          
          <p className="text-[var(--text-secondary)] mb-6">
            We couldn&apos;t verify your authentication. This could happen if:
          </p>
          
          <ul className="text-left text-sm text-[var(--text-secondary)] space-y-2 mb-6 bg-[var(--parchment)] p-4 rounded-lg">
            <li>• The link has expired</li>
            <li>• The link was already used</li>
            <li>• The link was invalid</li>
          </ul>

          <div className="space-y-3">
            <Link href="/auth/login">
              <Button variant="primary" fullWidth>
                Try Signing In Again
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="secondary" fullWidth icon={<ArrowLeft size={16} />}>
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
