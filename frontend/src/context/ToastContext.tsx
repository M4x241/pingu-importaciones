import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

interface ToastContextType {
  toast: (message: string, type?: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' = 'error') => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="!fixed !top-4 !right-4 !z-[100] !flex !flex-col !gap-2 !pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="!pointer-events-auto !px-5 !py-3 !rounded-xl !text-sm !font-bold !shadow-lg animate-slide-in !border"
            style={{
              background: t.type === 'success' ? '#065F46' : '#7F1D1D',
              color: '#fff',
              minWidth: '280px',
              borderColor: t.type === 'success' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)',
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
