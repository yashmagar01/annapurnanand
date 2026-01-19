'use client';

import { useState } from 'react';
import { useAdmin, OrderWithItems } from '@/context/AdminContext';
import { Search, Filter, Package, Calendar, Mail, ChevronDown } from 'lucide-react';

const statusOptions = ['pending', 'packed', 'shipped', 'delivered'] as const;
type OrderStatus = typeof statusOptions[number];

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  pending: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    dot: 'bg-red-500',
  },
  packed: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    dot: 'bg-yellow-500',
  },
  shipped: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
  delivered: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    dot: 'bg-green-500',
  },
};

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useAdmin();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.customer_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.customer_email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, status: string) => {
    updateOrderStatus(orderId, status);
    setActiveDropdown(null);
  };

  // Stats
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const shippedCount = orders.filter(o => o.status === 'shipped').length;
  const deliveredCount = orders.filter(o => o.status === 'delivered').length;

  const getStatusColors = (status: string | null) => {
    return statusColors[status || 'pending'] || statusColors.pending;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-heading)]">
          Order Tracking
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Manage and track all customer orders.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 rounded-lg p-4 border border-red-100">
          <p className="text-red-600 font-semibold text-2xl">{pendingCount}</p>
          <p className="text-red-600/70 text-sm">Pending</p>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <p className="text-amber-700 font-semibold text-2xl">{shippedCount}</p>
          <p className="text-amber-700/70 text-sm">Shipped</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-green-700 font-semibold text-2xl">{deliveredCount}</p>
          <p className="text-green-700/70 text-sm">Delivered</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)]" size={20} />
          <input
            type="text"
            placeholder="Search by order ID, customer, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none"
          />
        </div>
        
        {/* Status Filter */}
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)]" size={20} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-12 pr-8 py-3 rounded-lg border border-gray-200 focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none appearance-none bg-white min-w-[180px]"
          >
            <option value="all">All Status</option>
            {statusOptions.map(status => (
              <option key={status} value={status} className="capitalize">
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--parchment-dark)] border-b border-gray-200">
                <th className="text-left px-6 py-4 font-semibold text-[var(--text-primary)]">Order ID</th>
                <th className="text-left px-6 py-4 font-semibold text-[var(--text-primary)]">Customer</th>
                <th className="text-left px-6 py-4 font-semibold text-[var(--text-primary)]">Date</th>
                <th className="text-left px-6 py-4 font-semibold text-[var(--text-primary)]">Items</th>
                <th className="text-left px-6 py-4 font-semibold text-[var(--text-primary)]">Amount</th>
                <th className="text-left px-6 py-4 font-semibold text-[var(--text-primary)]">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const colors = getStatusColors(order.status);
                const itemCount = order.order_items?.length || 0;
                
                return (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-[var(--parchment)]/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-semibold text-[var(--riverbelt-blue)]">
                        {order.id.slice(0, 8)}...
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">
                          {order.customer_name || 'N/A'}
                        </p>
                        <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
                          <Mail size={12} />
                          {order.customer_email || 'N/A'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                        <Calendar size={14} />
                        <span>
                          {order.created_at 
                            ? new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                            : 'N/A'
                          }
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Package size={14} className="text-[var(--text-light)]" />
                        <span className="text-[var(--text-secondary)]">
                          {itemCount} item{itemCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-[var(--text-primary)]">₹{order.total.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      {/* Status Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === order.id ? null : order.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm ${colors.bg} ${colors.text} min-w-[130px] justify-between`}
                        >
                          <span className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                            <span className="capitalize">{order.status || 'pending'}</span>
                          </span>
                          <ChevronDown size={14} />
                        </button>
                        
                        {activeDropdown === order.id && (
                          <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-[150px]">
                            {statusOptions.map((status) => {
                              const optColors = statusColors[status];
                              return (
                                <button
                                  key={status}
                                  onClick={() => handleStatusChange(order.id, status)}
                                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 ${
                                    order.status === status ? 'bg-gray-50' : ''
                                  }`}
                                >
                                  <span className={`w-2 h-2 rounded-full ${optColors.dot}`} />
                                  <span className="capitalize text-[var(--text-primary)]">{status}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto text-[var(--text-light)]" size={48} />
            <p className="text-[var(--text-secondary)] mt-4">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
