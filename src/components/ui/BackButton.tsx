'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ href = '/' }: { href?: string }) {
  return (
    <Link
      href={href}
      className='inline-flex items-center gap-2 text-white text-sm opacity-80 hover:underline transition'
    >
      <ArrowLeft className='h-4 w-4' />
      Go Back
    </Link>
  );
}
