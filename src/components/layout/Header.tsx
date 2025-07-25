'use client';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className='flex items-center justify-between py-4 px-4 border-b border-[var(--bg-card)] text-[var(--text-primary)]'>
      <h1 className='text-xl font-bold'>Product Feedback</h1>
      <ThemeToggle />
    </header>
  );
}
