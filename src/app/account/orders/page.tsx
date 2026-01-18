'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Package, LogOut, Loader2, ShoppingBag, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  shipping_address: string;
  order_items: {
    id: string;
    product_name: string;
    quantity: number;
    price: number;
  }[];
}

export default function OrdersPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/account/orders');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching orders:', error);
      } else if (data) {
        setOrders(data);
      }
      setLoading(false);
    };

    if (user) {
      fetchOrders();
    }
  }, [user, supabase]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--parchment)]">
        <Loader2 className="animate-spin text-[var(--herbal-green)]" size={40} />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--parchment)] to-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--text-primary)]">
            My Orders
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Track and manage your orders
          </p>
        </div>

        <div className="grid md:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-fit">
            <nav className="space-y-1">
              <Link
                href="/account"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--parchment)] transition-colors"
              >
                <User size={20} />
                Profile
              </Link>
              <Link
                href="/account/orders"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--herbal-green)]/10 text-[var(--herbal-green)] font-medium"
              >
                <Package size={20} />
                My Orders
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full text-left"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-[var(--parchment)] flex items-center justify-center mb-4">
                  <ShoppingBag className="text-[var(--text-light)]" size={40} />
                </div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--text-primary)] mb-2">
                  No Orders Yet
                </h2>
                <p className="text-[var(--text-secondary)] mb-6">
                  You haven&apos;t placed any orders yet. Start shopping to see your orders here!
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--herbal-green)] text-white rounded-lg font-medium hover:bg-[var(--herbal-green-dark)] transition-colors"
                >
                  Browse Products
                  <ChevronRight size={18} />
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Order Header */}
                  <div className="bg-[var(--parchment)] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-xs text-[var(--text-light)] uppercase tracking-wide">Order ID</p>
                        <p className="font-mono text-sm font-medium text-[var(--text-primary)]">
                          {order.id.slice(0, 8).toUpperCase()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <Calendar size={14} />
                        {formatDate(order.created_at)}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-3">
                      {order.order_items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-[var(--text-primary)]">{item.product_name}</p>
                            <p className="text-sm text-[var(--text-secondary)]">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-[var(--text-primary)]">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap justify-between items-center gap-4">
                      {order.shipping_address && (
                        <div className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                          <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{order.shipping_address}</span>
                        </div>
                      )}
                      <div className="ml-auto">
                        <p className="text-sm text-[var(--text-secondary)]">Total</p>
                        <p className="text-lg font-bold text-[var(--herbal-green)]">
                          ₹{order.total.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
