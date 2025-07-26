'use client';

import Link from 'next/link';
import { useFeedbackStore } from '@/store/feedbackStore';
import SuggestionList from '@/components/feedback/SuggestionList';
import CategoryFilter from '@/components/feedback/CategoryFilter';
import SortDropdown from '@/components/feedback/SortDropdown';
import { useFeedbackInitializer } from '@/lib/userFeedbackInitializer';

export default function SuggestionsPage() {
  useFeedbackInitializer();

  const feedbacks = useFeedbackStore((s) => s.feedback);
  const toggleUpvote = useFeedbackStore((s) => s.toggleUpvote);

  const sort = useFeedbackStore((s) => s.sortOption);
  const setSort = useFeedbackStore((s) => s.setSortOption);

  // You can still handle category with Zustand, or keep local if preferred
  // For now, assuming it's local state:
  const [category, setCategory] = React.useState<'all' | string>('all');

  return (
    <main className='px-4 py-6 sm:px-8 lg:px-16 bg-[var(--bg-page)] min-h-screen text-[var(--text-primary)]'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
        <h1 className='text-2xl font-bold'>Suggestions</h1>

        <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
          <SortDropdown value={sort} onChange={setSort} />
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>

        <Link
          href='/feedback/new'
          className='bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-white px-4 py-2 rounded-md transition text-sm text-center'
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
