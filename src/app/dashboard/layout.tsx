'use client';

import { useAuth } from '@/lib/auth-context';
import { AppLayout } from '@/components/layout/AppLayout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  // 未认证时显示加载状态
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">加载中...</p>
      </div>
    );
  }

  return <AppLayout>{children}</AppLayout>;
}
