'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Leaf, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

export default function LoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push(redirect);
      router.refresh();
    }
  };

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

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-[var(--text-secondary)] text-center mb-8">
            Sign in to continue your wellness journey
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)]" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)]" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none transition-all"
                />
                <Button
                  type="button"
                  variant="tertiary"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-light)] hover:text-[var(--text-primary)]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
              <div className="mt-2 text-right">
                <Link 
                  href="/auth/forgot-password"
                  className="text-sm text-[var(--herbal-green)] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Submit */}

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={loading}
              icon={!loading ? <ArrowRight size={18} /> : undefined}
              iconPosition="right"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-[var(--text-light)]">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-[var(--text-secondary)]">
            Don't have an account?{' '}
            <Link 
              href={`/auth/signup${redirect !== '/' ? `?redirect=${redirect}` : ''}`}
              className="text-[var(--herbal-green)] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--herbal-green)]">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
