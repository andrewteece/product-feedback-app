'use client';

import { Category } from '@/types/feedback';
import clsx from 'clsx';
import { useFeedbackStore } from '@/store/feedbackStore';

const categories: (Category | 'all')[] = [
  'all',
  'ui',
  'ux',
  'enhancement',
  'bug',
  'feature',
];

type CategoryFilterProps = {
  selected?: Category | 'all';
  onChange?: (category: Category | 'all') => void;
};

export default function CategoryFilter({
  selected,
  onChange,
}: CategoryFilterProps) {
  // Use Zustand if props not passed
  const storeSelected = useFeedbackStore((s) => s.selectedCategory);
  const storeSet = useFeedbackStore((s) => s.setSelectedCategory);

  const current = selected ?? storeSelected;
  const set = onChange ?? storeSet;

  return (
    <div className='flex flex-wrap gap-2 bg-[var(--bg-card)] p-6 rounded-lg shadow-sm'>
      {categories.map((category) => {
        const normalized = category.toLowerCase() as Category | 'all';
        const isActive = current.toLowerCase() === normalized;

        return (
          <button
            key={category}
            onClick={() => set(normalized)}
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
