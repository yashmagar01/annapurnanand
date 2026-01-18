'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, User, Search, Menu, X, Leaf, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { user, loading, signOut } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'Our Story' },
    { href: '/riverbelt', label: 'The Riverbelt' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Trust Bar */}
      <div className="bg-gradient-to-r from-[var(--riverbelt-blue)] to-[var(--herbal-green)] text-white py-2 px-4">
        <div className="container mx-auto flex justify-center items-center text-sm">
          <span className="hidden sm:inline">Free Shipping on orders above ₹499</span>
          <span className="hidden sm:inline mx-4">|</span>
          <span className="flex items-center gap-2">
            <Leaf size={14} />
            <span>Formulated by <strong>Dr. Mohini (BAMS, MPH-N)</strong></span>
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Updated Brand Hierarchy */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Icon Container - Premium Treatment */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--herbal-green)] to-[var(--riverbelt-blue)] flex items-center justify-center transition-transform group-hover:scale-105 shadow-md">
              <Leaf className="text-white" size={22} />
            </div>
            
            {/* Brand Text - Clear Hierarchy */}
            <div className="flex flex-col leading-tight">
              {/* Master Brand - PROMINENT */}
              <span 
                className="font-[family-name:var(--font-heading)] text-[22px] font-semibold tracking-tight"
                style={{ color: 'var(--riverbelt-blue)' }}
              >
                ANNAPURNANAND
              </span>
              
              {/* Origin Line - SUBTLE */}
              <span 
                className="text-[10px] tracking-widest uppercase"
                style={{ color: 'var(--text-light)', letterSpacing: '0.1em' }}
              >
                by HerbalGold Riverbelt FPC
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--text-primary)] hover:text-[var(--herbal-green)] font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--premium-gold)] transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Utility Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-[var(--parchment)] rounded-full transition-colors"
              aria-label="Search"
            >
              <Search size={20} className="text-[var(--text-primary)]" />
            </button>

            {/* Account - Now with Auth State */}
            {!loading && (
              <div className="relative hidden sm:block" ref={userMenuRef}>
                {user ? (
                  <>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 p-2 hover:bg-[var(--parchment)] rounded-full transition-colors"
                      aria-label="Account menu"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--herbal-green)] to-[var(--riverbelt-blue)] flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {getUserDisplayName().charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <ChevronDown size={16} className={`text-[var(--text-secondary)] transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* User Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fade-in-up z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="font-semibold text-[var(--text-primary)]">{getUserDisplayName()}</p>
                          <p className="text-sm text-[var(--text-secondary)] truncate">{user.email}</p>
                        </div>
                        <Link
                          href="/account/orders"
                          className="flex items-center gap-3 px-4 py-2.5 text-[var(--text-primary)] hover:bg-[var(--parchment)] transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <ShoppingCart size={18} />
                          My Orders
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut size={18} />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--herbal-green)] text-white rounded-full font-medium text-sm hover:bg-[var(--herbal-green-dark)] transition-colors"
                  >
                    <User size={16} />
                    Sign In
                  </Link>
                )}
              </div>
            )}

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-[var(--parchment)] rounded-full transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} className="text-[var(--text-primary)]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--premium-gold)] text-[var(--text-primary)] text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-[var(--parchment)] rounded-full transition-colors lg:hidden"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-[var(--text-primary)]" />
              ) : (
                <Menu size={24} className="text-[var(--text-primary)]" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar (Expandable) */}
        {isSearchOpen && (
          <div className="mt-4 animate-fade-in-up">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for Moringa products..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)] focus:ring-opacity-20 outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)]" size={20} />
            </div>
          </div>
        )}

        {/* Mobile Menu - Enhanced with Backdrop Blur */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-[var(--premium-gold)]/20 animate-fade-in-up bg-white/95 backdrop-blur-sm rounded-b-xl">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[var(--text-primary)] hover:text-[var(--herbal-green)] hover:bg-[var(--herbal-green-50)] font-medium py-3 px-4 rounded-lg transition-all min-h-[44px] flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Auth Links */}
              {!loading && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-sm text-[var(--text-secondary)]">
                        Signed in as <strong>{getUserDisplayName()}</strong>
                      </div>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-2 text-red-600 font-medium py-3 px-4 rounded-lg transition-all min-h-[44px] w-full"
                      >
                        <LogOut size={18} />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="flex items-center gap-2 text-[var(--herbal-green)] font-medium py-3 px-4 rounded-lg transition-all min-h-[44px]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User size={18} />
                      Sign In / Sign Up
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
