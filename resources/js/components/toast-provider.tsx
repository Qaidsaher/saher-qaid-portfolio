import React, { createContext, useContext, useState, ReactNode } from "react";

type Toast = {
  id: string;
  title: string;
  description?: string;
};

type ToastContextValue = {
  toast: (options: { title: string; description?: string }) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ title, description }: { title: string; description?: string }) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, title, description };
    setToasts((prev) => [...prev, newToast]);

    // Automatically remove the toast after 3 seconds.
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((t) => (
          <div key={t.id} className="bg-gray-800 text-white p-4 rounded shadow">
            <strong>{t.title}</strong>
            {t.description && <div>{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
