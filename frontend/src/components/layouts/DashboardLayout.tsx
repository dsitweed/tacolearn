'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/stores/authStore';

import { SkeletonPage } from '../ui';
import { Header } from './Header';
import Sidebar from './Sidebar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth();
    }
  }, [checkAuth, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center p-10">
        <SkeletonPage />
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface flex h-screen dark:bg-slate-950 dark:text-slate-100">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 [scrollbar-gutter:stable] lg:py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
