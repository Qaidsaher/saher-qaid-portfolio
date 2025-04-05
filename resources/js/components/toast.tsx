import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  duration?: number; // Duration in milliseconds (default 6000)
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 6000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      // Allow time for fade-out animation then trigger onClose
      setTimeout(() => onClose(), 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center space-x-4 p-4 pr-2 rounded shadow-lg transform transition-all duration-300
        ${type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
    >
      {type === "success" ? (
        <CheckCircle className="w-6 h-6 flex-shrink-0" />
      ) : (
        <XCircle className="w-6 h-6 flex-shrink-0" />
      )}
      <span className="flex-1">{message}</span>
      <button
        className="ml-2 text-white focus:outline-none"
        onClick={() => {
          setVisible(false);
          setTimeout(() => onClose(), 300);
        }}
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
