'use client';

import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

export const ToastItem = ({ toast, onClose }: ToastProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(toast.id), 300); // Wait for animation
  };

  const icons = {
    success: <CheckCircle size={20} className="text-white" />,
    error: <AlertCircle size={20} className="text-white" />,
    info: <Info size={20} className="text-white" />,
  };

  const bgColors = {
    success: 'bg-[var(--herbal-green)]',
    error: 'bg-red-500',
    info: 'bg-[var(--riverbelt-blue)]',
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg shadow-black/5 transform transition-all duration-300 pointer-events-auto ${
        bgColors[toast.type]
      } ${
        isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
      }`}
      role="alert"
    >
      <div className="flex-shrink-0">{icons[toast.type]}</div>
      <p className="text-white font-medium text-sm pr-2">{toast.message}</p>
      <button
        onClick={handleClose}
        className="p-1 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white ml-auto"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) => {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none w-full max-w-sm px-4 sm:px-0 sm:w-auto">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
};
