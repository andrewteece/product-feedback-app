'use client';
import { useFeedbackStore } from '@/store/feedbackStore';
import type { Category } from '@/types/feedback';

const categories: (Category | 'All')[] = [
  'All',
  'UI',
  'UX',
  'Enhancement',
  'Bug',
  'Feature',
];

export default function CategoryFilter() {
  const selectedCategory = useFeedbackStore((s) => s.selectedCategory);
  const setCategory = useFeedbackStore((s) => s.setCategory);

  return (
    <div className='flex flex-wrap gap-2 my-4'>
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => setCategory(category)}
            className={`px-3 py-1 text-sm rounded-full border transition
              ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200'
              }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
