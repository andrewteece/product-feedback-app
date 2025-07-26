'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFeedbackStore } from '@/store/feedbackStore';
import SuggestionList from '@/components/feedback/SuggestionList';
import CategoryFilter from '@/components/feedback/CategoryFilter';
import SortDropdown from '@/components/feedback/SortDropdown';
import { useFeedbackInitializer } from '@/lib/userFeedbackInitializer';
import type { FilterableCategory } from '@/types/feedback';

export default function SuggestionsPage() {
  useFeedbackInitializer();

  const feedbacks = useFeedbackStore((s) => s.feedback);
  const toggleUpvote = useFeedbackStore((s) => s.toggleUpvote);

  const sort = useFeedbackStore((s) => s.sortOption);
  const setSort = useFeedbackStore((s) => s.setSortOption);

  // You can still handle category with Zustand, or keep local if preferred
  // For now, assuming it's local state:
  const [category, setCategory] = useState<FilterableCategory>('all');

  return (
    <main className='px-4 py-6 sm:px-8 lg:px-16 bg-[var(--bg-page)] min-h-screen text-[var(--text-primary)]'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[var(--bg-card)] px-6 py-4 rounded-lg shadow-sm mb-6'>
        <div className='flex items-center justify-between sm:justify-start sm:gap-8 w-full sm:w-auto'>
          <h1 className='text-lg font-bold text-[var(--text-primary)]'>
            {feedbacks.length} Suggestions
          </h1>

          <div className='flex items-center gap-2 text-sm text-[var(--text-muted)]'>
            <span className='font-medium'>Sort by:</span>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>

        <Link
          href='/feedback/new'
          className='mt-4 sm:mt-0 inline-block bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-white text-sm font-semibold py-2 px-4 rounded-lg transition'
        >
          + Add Feedback
        </Link>
      </div>

      <SuggestionList
        feedbacks={feedbacks}
        category={category}
        sort={sort}
        onUpvote={toggleUpvote}
      />
    </main>
  );
}
