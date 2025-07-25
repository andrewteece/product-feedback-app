'use client';

interface SortDropdownProps {
  value: string;
  onChange: (value: SortOption) => void;
}

export type SortOption =
  | 'Most Upvotes'
  | 'Least Upvotes'
  | 'Most Comments'
  | 'Least Comments';

const options: SortOption[] = [
  'Most Upvotes',
  'Least Upvotes',
  'Most Comments',
  'Least Comments',
];

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
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
