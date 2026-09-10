'use client';

import { CalendarDays, LogOut, Search } from 'lucide-react';

import { useLogout } from '@/hooks/api';
import { useAuthStore } from '@/stores/authStore';

import { Avatar, AvatarImage, Button, Separator } from '../ui';

export function Header() {
  const { user } = useAuthStore();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const todayFormatted = new Date().toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200/80 bg-slate-50/90 px-6 backdrop-blur-md">
      {/* Search Bar */}
      {/* TODO: Fix and add logic for search bar */}
      <div className="max-w-md flex-1">
        <div className="relative">
          <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="h-10 w-full rounded-xl border border-gray-200 bg-white pr-4 pl-10 text-sm text-gray-900 shadow-2xs transition-all placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 focus:outline-none"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* TODO: Add dark mode switcher */}
        {/* TODO: Add language switcher */}

        <Separator orientation="vertical" className="h-6" />

        {/* Date Pill */}
        <div className="hidden items-center gap-2 rounded-full border border-gray-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-2xs sm:flex">
          <CalendarDays className="size-3.5 text-indigo-600" />
          <span>Hôm nay, {todayFormatted}</span>
        </div>

        {/* User Avatar */}
        <Avatar>
          <AvatarImage
            src={
              user?.profile?.avatar ??
              `https://api.dicebear.com/10.x/thumbs/svg?seed=${user?.email}`
            }
            alt="user avatar"
          />
        </Avatar>

        {/* Logout Button */}
        <Button
          variant="ghost"
          onClick={handleLogout}
          title="Đăng xuất"
          className="flex size-9 rounded-full text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
