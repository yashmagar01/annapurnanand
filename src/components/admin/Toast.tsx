'use client';

import { X, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function ToastContainer() {
  const { toasts, dismissToast } = useAdmin();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle size={20} className="text-green-500" />,
          error: <AlertCircle size={20} className="text-red-500" />,
          warning: <AlertTriangle size={20} className="text-yellow-500" />,
        };
        
        const bgColors = {
          success: 'bg-green-50 border-green-200',
          error: 'bg-red-50 border-red-200',
          warning: 'bg-yellow-50 border-yellow-200',
        };

        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg animate-fade-in-up ${bgColors[toast.type]}`}
          >
            {icons[toast.type]}
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {toast.message}
            </span>
            <button
              onClick={() => dismissToast(toast.id)}
              className="ml-2 p-1 hover:bg-black/5 rounded transition-colors"
            >
              <X size={16} className="text-[var(--text-secondary)]" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
