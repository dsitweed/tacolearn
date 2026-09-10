'use client';

import { Bell, ChevronDown, LogOut, Search } from 'lucide-react';

import { useLogout } from '@/hooks/api';
import { useAuthStore } from '@/stores/authStore';

import { Avatar, AvatarFallback, AvatarImage, Button, Separator } from '../ui';

export function Header() {
  const { user } = useAuthStore();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-[#F9F9FF]/90 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
      {/* Search Bar & Class Indicator */}
      <div className="flex max-w-xl flex-1 items-center gap-3">
        <div className="relative max-w-xs flex-1 sm:max-w-sm">
          <Search className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm Kanji, từ vựng..."
            className="h-8.5 w-full rounded-lg border border-slate-200/60 bg-[#F0F3FF] pr-9 pl-8.5 text-xs text-[#111C2D] shadow-2xs transition-all placeholder:text-slate-400 focus:border-[#006C4A] focus:bg-white focus:ring-2 focus:ring-[#006C4A]/20 focus:outline-hidden dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
          <kbd className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded border border-slate-300/50 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-500 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            ⌘K
          </kbd>
        </div>

        {/* Live sync pill badge from Figma */}
        <div className="hidden items-center gap-1.5 rounded-lg bg-[#85F5C1]/40 px-3 py-1.5 text-xs font-semibold text-[#00714E] md:flex dark:bg-emerald-950/60 dark:text-emerald-300">
          <span className="size-2 animate-pulse rounded-full bg-[#006C4A]" />
          <span>Lớp N3-K24 • Trực tuyến</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Class Selection Dropdown Pill */}
        <div className="hidden cursor-pointer items-center gap-1.5 rounded-lg bg-[#F0F3FF] px-2.5 py-1 text-xs text-[#111C2D] transition-colors hover:bg-[#DEE8FF] sm:flex dark:bg-slate-900 dark:text-white">
          <span className="font-semibold text-[#006C4A] dark:text-emerald-400">
            Lớp:
          </span>
          <span className="font-bold">N3-K24</span>
          <ChevronDown className="ml-0.5 size-3 text-slate-500" />
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="size-8.5 rounded-lg p-0 text-slate-600 hover:bg-[#F0F3FF] hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Bell className="size-4" />
          </Button>
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[#BA1A1A] ring-2 ring-white dark:ring-slate-950" />
        </div>

        <Separator
          orientation="vertical"
          className="h-6 bg-slate-200/80 dark:bg-slate-800"
        />

        {/* User Info & Profile */}
        <div className="flex items-center gap-2 pl-1">
          <Avatar className="size-8 border border-slate-200 dark:border-slate-700">
            <AvatarImage
              src={
                user?.profile?.avatar ??
                `https://api.dicebear.com/10.x/thumbs/svg?seed=${user?.email ?? 'minh'}`
              }
              alt="user avatar"
            />
            <AvatarFallback className="bg-primary text-[10px] font-bold text-white">
              {user?.profile?.firstName?.[0] ?? 'M'}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col text-left lg:flex">
            <span className="text-xs leading-tight font-bold text-[#111C2D] dark:text-white">
              {user?.profile?.firstName && user?.profile?.lastName
                ? `${user.profile.lastName} ${user.profile.firstName}`
                : (user?.email?.split('@')[0] ?? 'Minh Nguyễn')}
            </span>
            <span className="text-[10px] leading-tight font-semibold text-[#006C4A] dark:text-emerald-400">
              Học viên N3
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          onClick={handleLogout}
          title="Đăng xuất"
          className="size-8.5 rounded-lg p-0 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
