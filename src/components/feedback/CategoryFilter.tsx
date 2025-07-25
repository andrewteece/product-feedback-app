'use client';

import type { Category } from '@/types/feedback';
import clsx from 'clsx';

const categories: (Category | 'all')[] = [
  'all',
  'ui',
  'ux',
  'enhancement',
  'bug',
  'feature',
];

interface CategoryFilterProps {
  selected: Category | 'all';
  onChange: (category: Category | 'all') => void;
}

export default function CategoryFilter({
  selected,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className='flex flex-wrap gap-2'>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={clsx(
            'text-xs px-3 py-1 rounded-md transition font-semibold',
            selected === category
              ? 'bg-[var(--btn-primary)] text-white'
              : 'bg-[var(--badge-bg)] text-[var(--text-primary)]'
          )}
        >
          {category === 'all'
            ? 'All'
            : category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
}
