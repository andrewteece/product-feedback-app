'use client';
import { useFeedbackStore } from '@/store/feedbackStore';

const options = [
  'Most Upvotes',
  'Least Upvotes',
  'Most Comments',
  'Least Comments',
] as const;

export default function SortDropdown() {
  const sortOption = useFeedbackStore((s) => s.sortOption);
  const setSortOption = useFeedbackStore((s) => s.setSortOption);

  return (
    <div className='mb-4'>
      <label htmlFor='sort' className='mr-2 text-sm font-medium'>
        Sort by:
      </label>
      <select
        id='sort'
        value={sortOption}
        onChange={(e) =>
          setSortOption(e.target.value as (typeof options)[number])
        }
        className='rounded border px-2 py-1 text-sm bg-white dark:bg-slate-800 dark:text-white'
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
