// components/Header.tsx
'use client';

import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const pageTitle = (() => {
    if (pathname.includes('roadmap')) return 'Roadmap';
    if (pathname.includes('feedback')) return 'Feedback Detail';
    return 'Suggestions';
  })();

  return (
    <header className='flex items-center justify-between px-6 py-4 bg-[var(--bg-header)] text-white dark:text-[var(--text-primary)] dark:bg-[var(--bg-card)] border-b border-[var(--border-header)]'>
      <div className='flex items-center gap-4'>
        <h1 className='text-lg font-bold tracking-tight'>{pageTitle}</h1>
      </div>

      <div className='flex items-center gap-4'>
        <ThemeToggle />
        <Link
          href='/new'
          className='bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-white font-semibold px-4 py-2 rounded-lg transition-colors'
        >
          + Add Feedback
        </Link>
      </div>
    </header>
  );
}
