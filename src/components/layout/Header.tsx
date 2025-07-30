'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle, BackButton } from '@/components/ui';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

export default function Header() {
  const pathname = usePathname();
  const isRoadmapPage = pathname.includes('roadmap');

  return (
    <header className='w-full bg-[var(--bg-header)]'>
      <LayoutWrapper className='flex items-center justify-between py-6'>
        <div className='flex flex-col gap-2'>
          {isRoadmapPage && <BackButton />}
          <h1 className='text-white text-xl font-bold tracking-tight'>
            {isRoadmapPage ? 'Roadmap' : 'Product Feedback App'}
          </h1>
        </div>

        <div className='flex items-center gap-4'>
          <ThemeToggle />
          <Link
            href='/new'
            className='rounded-lg bg-[var(--btn-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--btn-primary-hover)] transition'
          >
            + Add Feedback
          </Link>
        </div>
      </LayoutWrapper>
    </header>
  );
}
