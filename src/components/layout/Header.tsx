'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToogle, BackButton } from '@/components/ui';

export default function Header() {
  const pathname = usePathname();

  const isRoadmapPage = pathname.includes('roadmap');

  return (
    <header className='bg-[var(--bg-header)] px-4 py-6 sm:px-6 md:px-10'>
      <div className='mx-auto flex max-w-[1100px] items-center justify-between'>
        {isRoadmapPage ? (
          <div className='flex flex-col gap-2'>
            <BackButton />
            <h1 className='text-white text-xl font-bold tracking-tight'>
              Roadmap
            </h1>
          </div>
        ) : (
          <h1 className='text-white text-xl font-bold tracking-tight'>
            Product Feedback App
          </h1>
        )}

        <div className='flex items-center gap-4'>
          <ThemeToogle />
          <Link
            href='/new'
            className='rounded-lg bg-[var(--btn-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--btn-primary-hover)] transition'
          >
            + Add Feedback
          </Link>
        </div>
      </div>
    </header>
  );
}
