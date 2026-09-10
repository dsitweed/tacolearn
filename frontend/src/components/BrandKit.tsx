import { BookOpenCheck } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/utils';

function BrandLogoIcon() {
  return (
    <div className="bg-primary text-primary-foreground rounded-lg p-2.5 shadow-xs">
      <BookOpenCheck className="size-5" />
    </div>
  );
}

function BrandLogoText() {
  return (
    <div className="flex flex-col">
      <span className="text-primary font-heading text-xl font-bold tracking-tight">
        Taco<span className="text-secondary font-bold">Learn</span>
      </span>
      <span className="-mt-0.5 text-[9px] font-semibold tracking-widest text-slate-500 uppercase">
        EDTECH PLATFORM
      </span>
    </div>
  );
}

function BrandLogoCombined({
  link = '/dashboard',
  className,
}: {
  link?: string;
  className?: string;
}) {
  return (
    <Link
      href={link}
      className={cn(
        'group flex items-center gap-2.5 transition-opacity hover:opacity-90',
        className,
      )}
    >
      <BrandLogoIcon />
      <BrandLogoText />
    </Link>
  );
}

export { BrandLogoCombined, BrandLogoIcon, BrandLogoText };
