'use client';

import { Header } from './Header';
import Sidebar from './Sidebar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
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
