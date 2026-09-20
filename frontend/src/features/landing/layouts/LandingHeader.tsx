'use client';

import { LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import LocaleSwitcher from '@/components/LocaleSwitcher';
import { Avatar, AvatarImage, Button } from '@/components/ui';
import { useLogout } from '@/hooks/api';
import { useAuthStore } from '@/stores/authStore';

import { TacoLearnLogo } from '../components/TacoLearnLogo';

export function LandingHeader() {
  const { user } = useAuthStore();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Tính năng', href: '#features' },
    { label: 'Lộ trình JLPT', href: '#jlpt-paths' },
    { label: 'Lớp học', href: '#for-class' },
    { label: 'Bắt kịp bài', href: '#catch-up' },
    { label: 'Quy trình', href: '#how-it-works' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <TacoLearnLogo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-on-surface-variant hover:text-primary rounded-md px-3 py-2 text-sm font-medium transition-colors dark:text-slate-300 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-3 sm:flex">
          <LocaleSwitcher />

          {user ? (
            <>
              {/* Management dashboard */}
              {(user.role === 'ADMIN' || user.role === 'LANDLORD') && (
                <Link href="/dashboard">
                  <Button variant="outline">
                    <LayoutDashboard className="size-4" />
                    <span>Quản lý</span>
                  </Button>
                </Link>
              )}

              {/* User Avatar */}
              <Link href={'/dashboard'}>
                <Avatar>
                  <AvatarImage
                    src={
                      user?.profile?.avatar ??
                      `https://api.dicebear.com/10.x/thumbs/svg?seed=${user?.email}`
                    }
                    alt="user avatar"
                  />
                </Avatar>
              </Link>

              {/* Logout Button */}
              <Button
                variant="ghost"
                onClick={handleLogout}
                title="Đăng xuất"
                className="flex size-9 rounded-full text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="size-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Đăng nhập</Link>
              </Button>

              <Button
                size="sm"
                className="bg-primary hover:bg-primary-container text-white shadow-xs dark:bg-indigo-600 dark:hover:bg-indigo-700"
                asChild
              >
                <Link href="/register">Dùng thử miễn phí</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <Button
          variant="outline"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 hover:text-indigo-600 md:hidden dark:text-slate-200 dark:hover:bg-slate-800"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="space-y-3 border-b border-slate-200 bg-white px-4 pt-2 pb-6 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 border-t border-slate-100 pt-2 dark:border-slate-800">
            <Button variant="outline" className="w-full justify-center" asChild>
              <Link href="/login">Đăng nhập</Link>
            </Button>
            <Button
              className="w-full justify-center bg-indigo-600 text-white hover:bg-indigo-700"
              asChild
            >
              <Link href="/register">Dùng thử miễn phí</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
