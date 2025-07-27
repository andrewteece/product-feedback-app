'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import { Category } from '@/types/feedback';
import clsx from 'clsx';

const categories: (Category | 'all')[] = [
  'all',
  'ui',
  'ux',
  'enhancement',
  'bug',
  'feature',
];

export default function CategoryFilter() {
  const selectedCategory = useFeedbackStore((s) => s.selectedCategory);
  const setCategory = useFeedbackStore((s) => s.setSelectedCategory);

  return (
    <div className='flex flex-wrap gap-2 bg-[var(--bg-card)] p-6 rounded-lg shadow-sm'>
      {categories.map((category) => {
        const normalized = category.toLowerCase() as Category | 'all';
        const isActive = selectedCategory.toLowerCase() === normalized;

        return (
          <button
            key={category}
            onClick={() => setCategory(normalized)}
            className={clsx(
              'capitalize text-sm font-semibold px-4 py-1.5 rounded-xl transition-colors',
              isActive
                ? 'bg-[var(--btn-primary)] text-white'
                : 'bg-[var(--badge-bg)] text-[var(--text-primary)] hover:bg-[var(--btn-primary-hover)] hover:text-white'
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
