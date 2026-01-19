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
  const [scrolled, setScrolled] = useState(false);
  
  const { totalItems, setIsCartOpen } = useCart();
  const { user, loading, signOut } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Use lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

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
    <>
      {/* Top Trust Bar */}
      <div className="bg-gradient-to-r from-[var(--riverbelt-blue)] to-[var(--herbal-green)] text-white py-1.5 px-4 z-[60] relative">
        <div className="container mx-auto flex justify-center items-center text-xs sm:text-sm font-medium tracking-wide">
          <span className="hidden sm:inline opacity-90">Free Shipping on orders above ₹499</span>
          <span className="hidden sm:inline mx-4 opacity-50">|</span>
          <span className="flex items-center gap-2">
            <Leaf size={12} className="text-[var(--premium-gold)]" />
            <span>Formulated by <strong className="text-[var(--premium-gold-50)]">Dr. Mohini (BAMS, MPH-N)</strong></span>
          </span>
        </div>
      </div>

      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled || isMobileMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
        }`}
      >
        <nav className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group z-50">
              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[var(--herbal-green)] to-[var(--riverbelt-blue)] flex items-center justify-center transition-transform group-hover:scale-105 shadow-md border-2 border-white">
                <Leaf className="text-white" size={20} />
              </div>
              
              {/* Text */}
              <div className="flex flex-col leading-tight">
                <span 
                  className="font-[family-name:var(--font-heading)] text-lg sm:text-2xl font-bold tracking-tight text-[var(--riverbelt-blue)]"
                >
                  ANNAPURNANAND
                </span>
                <span 
                  className="text-[9px] sm:text-[10px] tracking-widest uppercase text-[var(--text-secondary)] font-medium"
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
                  className="text-[var(--text-primary)] hover:text-[var(--herbal-green)] font-medium text-sm transition-colors relative group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--herbal-green)] transition-all group-hover:w-full opacity-50" />
                </Link>
              ))}
            </div>

            {/* Utility Icons */}
            <div className="flex items-center gap-2 sm:gap-4 z-50">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-[var(--parchment)] rounded-full transition-colors group"
                aria-label="Search"
              >
                <Search size={20} className="text-[var(--text-primary)] group-hover:text-[var(--herbal-green)]" />
              </button>

              {/* Desktop User Menu */}
              {!loading && (
                <div className="relative hidden sm:block" ref={userMenuRef}>
                  {user ? (
                    <>
                      <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center gap-2 p-1 pl-2 pr-3 hover:bg-[var(--parchment)] rounded-full transition-all border border-transparent hover:border-gray-100"
                        aria-label="Account menu"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--herbal-green)] to-[var(--riverbelt-blue)] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                          {getUserDisplayName().charAt(0).toUpperCase()}
                        </div>
                        <ChevronDown size={14} className={`text-[var(--text-secondary)] transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown */}
                      {isUserMenuOpen && (
                        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in-up origin-top-right overflow-hidden">
                          <div className="px-5 py-4 bg-[var(--parchment)] border-b border-gray-100">
                            <p className="font-semibold text-[var(--text-primary)]">{getUserDisplayName()}</p>
                            <p className="text-xs text-[var(--text-secondary)] truncate mt-0.5">{user.email}</p>
                          </div>
                          
                          <div className="p-2">
                             <Link
                               href="/account/orders"
                               className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--herbal-green-50)] hover:text-[var(--herbal-green)] rounded-lg transition-colors"
                               onClick={() => setIsUserMenuOpen(false)}
                             >
                               <ShoppingCart size={16} />
                               My Orders
                             </Link>
                             <button
                               onClick={handleSignOut}
                               className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left mt-1"
                             >
                               <LogOut size={16} />
                               Sign Out
                             </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="flex items-center gap-2 px-5 py-2 bg-[var(--herbal-green)] text-white rounded-full font-medium text-sm hover:bg-[var(--herbal-green-dark)] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <User size={16} />
                      Sign In
                    </Link>
                  )}
                </div>
              )}

              {/* Cart Toggle */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:bg-[var(--parchment)] rounded-full transition-colors relative group"
                aria-label="Cart"
              >
                <ShoppingCart size={20} className="text-[var(--text-primary)] group-hover:text-[var(--herbal-green)]" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[var(--herbal-green)] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-[var(--parchment)] rounded-full transition-colors lg:hidden z-50"
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

          {/* Expanded Search Bar */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                autoFocus={isSearchOpen}
                className="w-full px-5 py-3 pl-12 rounded-full border border-gray-200 bg-[var(--parchment)] focus:bg-white focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none transition-all shadow-inner text-sm"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)]" size={18} />
              <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full"
              >
                  <X size={14} className="text-gray-400" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-all duration-300 lg:hidden flex flex-col pt-24 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col h-full overflow-y-auto pb-8">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-[family-name:var(--font-heading)] font-semibold text-[var(--text-primary)] py-4 border-b border-gray-100 active:text-[var(--herbal-green)] transition-colors flex items-center justify-between group"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {link.label}
                  <span className="w-8 h-8 rounded-full bg-[var(--parchment)] flex items-center justify-center group-active:bg-[var(--herbal-green)] group-active:text-white transition-colors">
                      <ChevronDown size={16} className="-rotate-90" />
                  </span>
                </Link>
              ))}
            </nav>

            {/* Mobile Account Section */}
            <div className="mt-8 pt-8 border-t border-gray-100">
               {!loading && (
                 <>
                   {user ? (
                      <div className="bg-[var(--parchment)] rounded-2xl p-6">
                        <div className="flex items-center gap-4 mb-6">
                           <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[var(--herbal-green)] font-bold text-lg shadow-sm">
                             {getUserDisplayName().charAt(0).toUpperCase()}
                           </div>
                           <div>
                              <p className="font-semibold text-lg">{getUserDisplayName()}</p>
                              <p className="text-sm text-[var(--text-secondary)]">{user.email}</p>
                           </div>
                        </div>
                        <div className="grid gap-3">
                           <Link
                             href="/account/orders"
                             className="btn-white w-full justify-start pl-4"
                             onClick={() => setIsMobileMenuOpen(false)}
                           >
                              <ShoppingCart size={18} /> My Orders
                           </Link>
                           <button
                             onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                             className="btn-white w-full justify-start pl-4 text-red-600 hover:bg-red-50"
                           >
                              <LogOut size={18} /> Sign Out
                           </button>
                        </div>
                      </div>
                   ) : (
                      <div className="grid gap-4">
                        <p className="text-[var(--text-secondary)] text-center mb-2">Join our wellness community</p>
                        <Link
                          href="/auth/signup"
                          className="btn-herbal w-full justify-center"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Create Account
                        </Link>
                        <Link
                          href="/auth/login"
                          className="btn-outline w-full justify-center"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                      </div>
                   )}
                 </>
               )}
            </div>
        </div>
      </div>
    </>
  );
}
