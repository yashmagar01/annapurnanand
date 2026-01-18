'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Leaf, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
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

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-[var(--herbal-green)]/10 flex items-center justify-center mb-4">
              <CheckCircle className="text-[var(--herbal-green)]" size={32} />
            </div>
            
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] mb-2">
              Check Your Email
            </h2>
            
            <p className="text-[var(--text-secondary)] mb-6">
              We&apos;ve sent a password reset link to <strong>{email}</strong>. 
              Click the link in the email to reset your password.
            </p>
            
            <div className="bg-[var(--parchment)] p-4 rounded-lg text-sm text-[var(--text-secondary)] mb-6">
              <p>Didn&apos;t receive the email? Check your spam folder or try again in a few minutes.</p>
            </div>

            <Link href="/auth/login">
              <Button variant="secondary" fullWidth icon={<ArrowLeft size={16} />}>
                Back to Sign In
              </Button>
            </Link>
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

        {/* Forgot Password Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] text-center mb-2">
            Reset Password
          </h1>
          <p className="text-[var(--text-secondary)] text-center mb-8">
            Enter your email and we&apos;ll send you a link to reset your password
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
              Send Reset Link
            </Button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link 
              href="/auth/login"
              className="text-[var(--herbal-green)] font-semibold hover:underline inline-flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
