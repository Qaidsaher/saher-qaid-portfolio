import React, { createContext, useContext, useState, useCallback } from 'react';

export interface ToastOptions {
  title: string;
  description?: string;
}

interface ToastContextProps {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const toast = useCallback((options: ToastOptions) => {
    setToasts((prev) => [...prev, options]);

    // Remove the toast after 3 seconds.
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t !== options));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white px-4 py-2 rounded shadow-md"
          >
            <strong>{t.title}</strong>
            {t.description && <p className="mt-1 text-sm">{t.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextProps {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
