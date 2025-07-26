'use client';

export type SortOption =
  | 'most-upvotes'
  | 'least-upvotes'
  | 'most-comments'
  | 'least-comments';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SORT_LABELS: Record<SortOption, string> = {
  'most-upvotes': 'Most Upvotes',
  'least-upvotes': 'Least Upvotes',
  'most-comments': 'Most Comments',
  'least-comments': 'Least Comments',
};

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className='mb-4'>
      <label htmlFor='sort' className='mr-2 text-sm font-medium'>
        Sort by:
      </label>
      <select
        id='sort'
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className='rounded border px-2 py-1 text-sm bg-white dark:bg-slate-800 dark:text-white'
      >
        {Object.entries(SORT_LABELS).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
