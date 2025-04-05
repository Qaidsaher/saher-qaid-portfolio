import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import Toast from '@/components/toast'; // تأكد أن مسار المكون صحيح

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
  // قم بجلب الخصائص من Inertia واستخدم قيمة افتراضية ل flash في حال لم تكن موجودة
  const { flash = {} } = usePage().props as { flash?: { success?: string; error?: string } };

  // حالة لإدارة بيانات التوست
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (flash.success) {
      setToast({ message: flash.success, type: 'success' });
    } else if (flash.error) {
      setToast({ message: flash.error, type: 'error' });
    }
  }, [flash]);

  return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </AppLayoutTemplate>
  );
}
