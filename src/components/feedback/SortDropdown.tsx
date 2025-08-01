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
  const fallbackValue = useFeedbackStore((s) => s.sortOption);
  const fallbackOnChange = useFeedbackStore((s) => s.setSortOption);

  const current = value ?? fallbackValue;
  const set = onChange ?? fallbackOnChange;

  return (
    <div className='relative'>
      <select
        id='sort'
        value={current}
        onChange={(e) => set(e.target.value as SortOption)}
        className='appearance-none bg-transparent text-white font-semibold pr-6 cursor-pointer text-sm focus:outline-none'
      >
        {Object.entries(SORT_LABELS).map(([key, label]) => (
          <option key={key} value={key} className='text-black'>
            {label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className='absolute right-1 top-1/2 -translate-y-1/2 text-white pointer-events-none'
      />
    </div>
  );
}
