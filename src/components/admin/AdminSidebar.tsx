'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Truck, Settings, Leaf, LogOut } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: Truck },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[var(--riverbelt-blue)] min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Leaf className="text-[var(--premium-gold)]" size={20} />
          </div>
          <div>
            <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-white">
              Annapurnanand
            </span>
            <span className="block text-[10px] text-white/70 uppercase tracking-wider">
              Admin Panel
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-[var(--premium-gold)]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User / Logout */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-[var(--premium-gold)] flex items-center justify-center text-white font-bold">
            DM
          </div>
          <div className="flex-1">
            <p className="text-white font-medium text-sm">Dr. Mohini</p>
            <p className="text-white/60 text-xs">Admin</p>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 mt-2 text-white/60 hover:text-white text-sm transition-colors"
        >
          <LogOut size={16} />
          <span>Back to Site</span>
        </Link>
      </div>
    </aside>
  );
}
