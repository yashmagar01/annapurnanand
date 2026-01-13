'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import productsData from '@/data/products.json';

// Types
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  shortDescription: string;
  netQty: string;
  ingredients?: string;
  idealFor?: string[];
  doctorNote?: string;
  howToUse?: Array<{ icon: string; text: string }>;
  nutrition?: Record<string, string>;
  image: string;
  featured: boolean;
  stock?: number; // For admin tracking
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: Array<{ productId: string; name: string; qty: number; price: number }>;
  total: number;
  status: 'pending' | 'packed' | 'shipped' | 'delivered';
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning';
  message: string;
}

interface AdminContextType {
  products: Product[];
  orders: Order[];
  toasts: Toast[];
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  showToast: (type: Toast['type'], message: string) => void;
  dismissToast: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Simulated dummy orders
const initialOrders: Order[] = [
  {
    id: 'ORD001',
    customer: 'Rahul Sharma',
    email: 'rahul.s@email.com',
    date: '2026-01-13',
    items: [{ productId: 'daily-moringa-health-drink', name: 'Daily Moringa Health Drink', qty: 2, price: 349 }],
    total: 698,
    status: 'delivered'
  },
  {
    id: 'ORD002',
    customer: 'Priya Mehta',
    email: 'priya.m@email.com',
    date: '2026-01-13',
    items: [{ productId: 'moringa-cocoa-smoothie', name: 'Moringa Cocoa Smoothie Mix', qty: 1, price: 449 }],
    total: 449,
    status: 'shipped'
  },
  {
    id: 'ORD003',
    customer: 'Amit Kumar',
    email: 'amit.k@email.com',
    date: '2026-01-12',
    items: [
      { productId: 'moringa-capsules', name: 'Moringa Capsules', qty: 1, price: 549 },
      { productId: 'moringa-millet-nutrition', name: 'Moringa Millet Nutrition Powder', qty: 1, price: 399 }
    ],
    total: 948,
    status: 'packed'
  },
  {
    id: 'ORD004',
    customer: 'Sunita Devi',
    email: 'sunita.d@email.com',
    date: '2026-01-12',
    items: [{ productId: 'moringa-digestive-mix', name: 'Moringa Digestive Herbal Mix', qty: 3, price: 299 }],
    total: 897,
    status: 'pending'
  },
  {
    id: 'ORD005',
    customer: 'Vikram Singh',
    email: 'vikram.s@email.com',
    date: '2026-01-11',
    items: [{ productId: 'moringa-tablets', name: 'Moringa Tablets', qty: 2, price: 499 }],
    total: 998,
    status: 'delivered'
  },
];

export function AdminProvider({ children }: { children: ReactNode }) {
  // Initialize products with stock values
  const [products, setProducts] = useState<Product[]>(
    productsData.products.map((p, i) => ({
      ...p,
      stock: [45, 32, 8, 15, 52, 5][i] // Simulated stock - some low for alerts
    })) as Product[]
  );
  
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: Toast['type'], message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('success', 'Product updated successfully!');
  }, [showToast]);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('success', 'Product deleted successfully!');
  }, [showToast]);

  const addProduct = useCallback((product: Omit<Product, 'id' | 'slug'>) => {
    const id = product.name.toLowerCase().replace(/\s+/g, '-');
    const newProduct: Product = {
      ...product,
      id,
      slug: id,
    };
    setProducts(prev => [...prev, newProduct]);
    showToast('success', 'New product added successfully!');
  }, [showToast]);

  const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    showToast('success', `Order ${id} status updated to ${status}`);
  }, [showToast]);

  return (
    <AdminContext.Provider value={{
      products,
      orders,
      toasts,
      updateProduct,
      deleteProduct,
      addProduct,
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
