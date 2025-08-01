'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type BackButtonProps = {
  href?: string;
  className?: string;
} & HTMLAttributes<HTMLAnchorElement>;

export default function BackButton({
  href = '/',
  className,
  ...props
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 text-white text-sm opacity-80 hover:underline transition',
        className
      )}
      {...props}
    >
      <ArrowLeft className='h-4 w-4' />
      Go Back
    </Link>
  );
}
