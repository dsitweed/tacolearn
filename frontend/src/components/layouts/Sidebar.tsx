'use client';

import {
  Bell,
  BookOpen,
  CalendarDays,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  RotateCcw,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage, Badge } from '@/components/ui';
import { UserRole } from '@/generated/model';
import { useAuthStore } from '@/stores/authStore';
import { cn, getPathWithoutLocale } from '@/utils';

import { BrandLogoCombined } from '../BrandKit';

type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: 'emerald' | 'default';
  roles?: UserRole[];
};

type NavSection = {
  label: string;
  items: NavItem[];
};

const navigationSections: NavSection[] = [
  {
    label: 'HỌC TẬP & SRS',
    items: [
      {
        title: 'Tổng quan',
        href: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'Ôn tập SRS',
        href: '/dashboard/srs-review',
        icon: RotateCcw,
        badge: '18',
        badgeVariant: 'emerald',
      },
      {
        title: 'Kho Kanji & Từ vựng',
        href: '/dashboard',
        icon: BookOpen,
      },
      {
        title: 'Lịch học & Điểm danh',
        href: '/dashboard',
        icon: CalendarDays,
      },
    ],
  },
  {
    label: 'QUẢN LÝ TRƯỜNG HỌC',
    items: [
      {
        title: 'Lớp học của tôi',
        href: '/dashboard',
        icon: GraduationCap,
      },
      {
        title: 'Bài thi & Quiz',
        href: '/dashboard',
        icon: FileCheck2,
      },
      {
        title: 'Thông báo',
        href: '/dashboard',
        icon: Bell,
      },
      {
        title: 'Cài đặt & Hồ sơ',
        href: '/dashboard/settings',
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const role = user?.role;
  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <aside className="bg-surface-container-low fixed top-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200/80 shadow-xs dark:border-slate-800 dark:bg-slate-950">
      {/* Brand Header */}
      <div className="flex h-16 items-center border-b border-slate-200/50 px-4 dark:border-slate-800">
        <BrandLogoCombined className="w-full" />
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {navigationSections.map((section) => (
          <div key={section.label} className="space-y-1">
            <h3 className="px-3 text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              {section.label}
            </h3>
            <div className="mt-1 space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathWithoutLocale === item.href ||
                  (item.href !== '/dashboard' &&
                    pathWithoutLocale.startsWith(item.href));

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      'group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all duration-150',
                      isActive
                        ? 'bg-surface-container-high text-primary font-semibold shadow-xs dark:bg-indigo-950 dark:text-white'
                        : 'text-slate-600 hover:bg-white/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white',
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={cn(
                          'size-4 transition-colors',
                          isActive
                            ? 'text-primary dark:text-indigo-400'
                            : 'text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white',
                        )}
                      />
                      <span>{item.title}</span>
                    </div>

                    {item.badge && (
                      <span className="bg-secondary flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white shadow-2xs">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Info Bottom Card */}
      <div className="border-t border-slate-200/60 p-3 dark:border-slate-800">
        <div className="flex items-center justify-between rounded-xl border border-slate-200/50 bg-white p-2.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex min-w-0 items-center gap-2.5">
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
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-900 dark:text-white">
                {user?.profile?.firstName && user?.profile?.lastName
                  ? `${user.profile.lastName} ${user.profile.firstName}`
                  : (user?.email?.split('@')[0] ?? 'Minh Nguyễn')}
              </p>
              <p className="truncate text-[10px] font-medium text-slate-500 dark:text-slate-400">
                {role === UserRole.ADMIN ? 'Quản trị viên' : 'Học viên N3'}
              </p>
            </div>
          </div>

          <Badge className="bg-surface-container text-primary hover:bg-surface-container rounded-full px-1.5 py-0.5 text-[10px] font-extrabold dark:bg-indigo-950 dark:text-indigo-300">
            N3
          </Badge>
        </div>
      </div>
    </aside>
  );
}
