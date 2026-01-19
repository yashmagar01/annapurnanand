'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Leaf, ArrowRight, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

export default function SignupClient() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { signUp } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const { error } = await signUp(email, password, fullName);
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      // Auto-login happens via auth state change
      setTimeout(() => {
        router.push(redirect);
        router.refresh();
      }, 1500);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--parchment)] to-[var(--parchment-dark)] py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="w-16 h-16 mx-auto rounded-full bg-[var(--herbal-green)]/10 flex items-center justify-center mb-4">
              <Leaf className="text-[var(--herbal-green)]" size={32} />
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] mb-2">
              Welcome to Annapurnanand!
            </h2>
            <p className="text-[var(--text-secondary)]">
              Your account has been created. Redirecting you...
            </p>
          </div>
        </div>
      </div>
    );
  }

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

        {/* Sign Up Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] text-center mb-2">
            Create Account
          </h1>
          <p className="text-[var(--text-secondary)] text-center mb-8">
            Join our wellness community today
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)]" size={18} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none transition-all"
                />
              </div>
            </div>

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
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none transition-all"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="tertiary"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-light)] hover:text-[var(--text-primary)]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
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
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-[var(--text-light)]">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Login Link */}
          <p className="text-center text-[var(--text-secondary)]">
            Already have an account?{' '}
            <Link 
              href={`/auth/login${redirect !== '/' ? `?redirect=${redirect}` : ''}`}
              className="text-[var(--herbal-green)] font-semibold hover:underline"
            >
              Sign In
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
