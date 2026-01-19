'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Product, Order, OrderItem } from '@/lib/database.types';

// Re-export types for convenience
export type { Order, Product } from '@/lib/database.types';

// Extended Order type with items
export interface OrderWithItems extends Order {
  order_items?: OrderItem[];
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning';
  message: string;
}

interface AdminContextType {
  products: Product[];
  orders: OrderWithItems[];
  toasts: Toast[];
  loading: boolean;
  refreshProducts: () => Promise<void>;
  refreshOrders: () => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateOrderStatus: (id: string, status: string) => Promise<void>;
  showToast: (type: Toast['type'], message: string) => void;
  dismissToast: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const showToast = useCallback((type: Toast['type'], message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const refreshProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      showToast('error', 'Failed to load products');
      return;
    }
    
    setProducts(data || []);
  }, [supabase, showToast]);

  const refreshOrders = useCallback(async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      showToast('error', 'Failed to load orders');
      return;
    }
    
    setOrders(data || []);
  }, [supabase, showToast]);

  // Initial load
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      await Promise.all([refreshProducts(), refreshOrders()]);
      setLoading(false);
    }
    loadData();
  }, [refreshProducts, refreshOrders]);

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    const { error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id);
    
    if (error) {
      showToast('error', 'Failed to update product');
      return;
    }
    
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('success', 'Product updated successfully!');
  }, [supabase, showToast]);

  const deleteProduct = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      showToast('error', 'Failed to delete product');
      return;
    }
    
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('success', 'Product deleted successfully!');
  }, [supabase, showToast]);

  const updateOrderStatus = useCallback(async (id: string, status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);
    
    if (error) {
      showToast('error', 'Failed to update order status');
      return;
    }
    
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    showToast('success', `Order status updated to ${status}`);
  }, [supabase, showToast]);

  return (
    <AdminContext.Provider value={{
      products,
      orders,
      toasts,
      loading,
      refreshProducts,
      refreshOrders,
      updateProduct,
      deleteProduct,
      updateOrderStatus,
      showToast,
      dismissToast,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
