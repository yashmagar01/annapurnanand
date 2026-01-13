'use client';

import { AdminProvider } from '@/context/AdminContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ToastContainer from '@/components/admin/Toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <div className="flex min-h-screen bg-[var(--parchment)]">
        {/* Sidebar */}
        <AdminSidebar />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        
        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </AdminProvider>
  );
}
