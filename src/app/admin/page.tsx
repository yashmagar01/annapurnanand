'use client';

import { useAdmin } from '@/context/AdminContext';
import StatsCard from '@/components/admin/StatsCard';
import { Package, IndianRupee, Truck, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { products, orders } = useAdmin();
  
  // Calculate stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const lowStockProducts = products.filter(p => (p.stock || 0) < 10);
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-heading)]">
          Dashboard
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Welcome back, Dr. Mohini! Here's what's happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Orders"
          value={totalOrders}
          icon={Package}
          trend={{ value: '+12% this week', positive: true }}
          variant="default"
        />
        <StatsCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          icon={IndianRupee}
          trend={{ value: '+8% this week', positive: true }}
          variant="success"
        />
        <StatsCard
          title="Pending Orders"
          value={pendingOrders}
          icon={Clock}
          variant="warning"
        />
        <StatsCard
          title="Low Stock Alert"
          value={lowStockProducts.length}
          icon={AlertTriangle}
          variant={lowStockProducts.length > 0 ? 'danger' : 'default'}
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-500" size={24} />
              <h2 className="text-lg font-semibold text-red-700">Low Stock Alert</h2>
            </div>
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{product.name}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{product.category}</p>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                    {product.stock} left
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/admin/products"
              className="mt-4 inline-flex items-center text-red-600 hover:text-red-700 font-medium text-sm"
            >
              Manage Inventory →
            </Link>
          </div>
        )}

        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-[var(--riverbelt-blue)] hover:underline text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {orders.slice(0, 4).map((order) => {
              const statusColors = {
                pending: 'bg-red-100 text-red-700',
                packed: 'bg-yellow-100 text-yellow-700',
                shipped: 'bg-[var(--premium-gold-100)] text-[var(--premium-gold-dark)]',
                delivered: 'bg-[var(--herbal-green-50)] text-[var(--herbal-green)]',
              };
              
              return (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{order.id}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[var(--text-primary)]">₹{order.total}</p>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/products"
              className="flex items-center gap-3 p-4 rounded-lg bg-[var(--herbal-green-50)] hover:bg-[var(--herbal-green-100)] transition-colors"
            >
              <Package className="text-[var(--herbal-green)]" size={20} />
              <span className="font-medium text-[var(--herbal-green)]">Manage Products</span>
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 p-4 rounded-lg bg-[var(--riverbelt-blue-50)] hover:bg-[var(--riverbelt-blue-100)] transition-colors"
            >
              <Truck className="text-[var(--riverbelt-blue)]" size={20} />
              <span className="font-medium text-[var(--riverbelt-blue)]">View Orders</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 p-4 rounded-lg bg-[var(--premium-gold-50)] hover:bg-[var(--premium-gold-100)] transition-colors col-span-2"
            >
              <TrendingUp className="text-[var(--premium-gold-dark)]" size={20} />
              <span className="font-medium text-[var(--premium-gold-dark)]">Preview Live Store</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
