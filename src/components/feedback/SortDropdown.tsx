'use client';

import { ChevronDown } from 'lucide-react';
import { useFeedbackStore } from '@/store/feedbackStore';

export type SortOption =
  | 'most-upvotes'
  | 'least-upvotes'
  | 'most-comments'
  | 'least-comments';

type SortDropdownProps = {
  value?: SortOption;
  onChange?: (value: SortOption) => void;
};

const SORT_LABELS: Record<SortOption, string> = {
  'most-upvotes': 'Most Upvotes',
  'least-upvotes': 'Least Upvotes',
  'most-comments': 'Most Comments',
  'least-comments': 'Least Comments',
};

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  // Zustand fallback if props are not passed
  const storeValue = useFeedbackStore((s) => s.sortOption);
  const storeOnChange = useFeedbackStore((s) => s.setSortOption);

  const current = value ?? storeValue;
  const set = onChange ?? storeOnChange;

  return (
    <div className='relative flex items-center gap-2 text-sm font-medium text-[var(--text-muted)]'>
      <span className='font-semibold'>Sort by:</span>
      <select
        id='sort'
        value={current}
        onChange={(e) => set(e.target.value as SortOption)}
        className='appearance-none bg-transparent text-[var(--text-primary)] font-semibold pr-6 cursor-pointer focus:outline-none'
      >
        {Object.entries(SORT_LABELS).map(([key, label]) => (
          <option key={key} value={key} className='text-[var(--text-primary)]'>
            {label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className='absolute right-1 pointer-events-none text-[var(--text-muted)]'
      />
    </div>
  );
}
