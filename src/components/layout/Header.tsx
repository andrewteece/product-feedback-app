'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle, BackButton } from '@/components/ui';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { routes } from '@/lib/routes';
import SortDropdown from '@/components/feedback/SortDropdown';

export default function Header() {
  const pathname = usePathname();
  const isRoadmapPage =
    pathname === '/roadmap' || pathname.includes('/roadmap');
  const isHomePage = pathname === '/';

  return (
    <header className='w-full bg-[var(--bg-header)]'>
      <LayoutWrapper className='flex items-center justify-between py-5'>
        {/* Left: title & back button */}
        <div className='flex items-center gap-6'>
          {isRoadmapPage && <BackButton />}
          <h1 className='text-white text-xl font-bold tracking-tight'>
            {isRoadmapPage ? 'Roadmap' : 'Product Feedback App'}
          </h1>
        </div>

        {/* Right: sort (if home), toggle, button */}
        <div className='flex items-center gap-4'>
          {isHomePage && <SortDropdown />}
          <ThemeToggle />
          <Link
            href={routes.newFeedback}
            className='rounded-lg bg-[var(--btn-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--btn-primary-hover)] transition'
          >
            + Add Feedback
          </Link>
        </div>
      </LayoutWrapper>
    </header>
  );
}
