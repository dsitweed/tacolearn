import { BookOpenCheck } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/utils';

interface TacoLearnLogoProps {
  href?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TacoLearnLogo({
  href = '/',
  className,
  size = 'md',
}: TacoLearnLogoProps) {
  const iconSizes = {
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-6',
  };

  const containerSizes = {
    sm: 'p-1.5 rounded-md',
    md: 'p-2 rounded-lg',
    lg: 'p-2.5 rounded-xl',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link
      href={href}
      className={cn(
        'group flex items-center gap-2.5 transition-all',
        className,
      )}
    >
      <div
        className={cn(
          'bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-md shadow-indigo-500/20 transition-transform group-hover:scale-105',
          containerSizes[size],
        )}
      >
        <BookOpenCheck className={iconSizes[size]} />
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            'leading-none font-bold tracking-tight text-slate-900 dark:text-white',
            textSizes[size],
          )}
        >
          Taco
          <span className="text-indigo-600 dark:text-indigo-400">Learn</span>
        </span>
        <span className="text-muted-foreground mt-0.5 text-[10px] leading-tight font-medium tracking-wider uppercase">
          学ぶ、覚える、伸ばす
        </span>
      </div>
    </Link>
  );
}
