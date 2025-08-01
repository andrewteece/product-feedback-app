'use client';

import type { Feedback, Category } from '@/types/feedback';
import type { SortOption } from './SortDropdown';
import FeedbackCard from './FeedbackCard';

interface SuggestionListProps {
  feedback: Feedback[];
  category: Category | 'all';
  sort: SortOption;
  onUpvote?: (id: number) => void;
}

export default function SuggestionList({
  feedback,
  category,
  sort,
  onUpvote,
}: SuggestionListProps) {
  const filtered = feedback.filter((f) => {
    return (
      f.status === 'suggestion' &&
      (category === 'all' || f.category === category)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'most-upvotes':
        return b.upvotes - a.upvotes;
      case 'least-upvotes':
        return a.upvotes - b.upvotes;
      case 'most-comments':
        return (b.comments?.length ?? 0) - (a.comments?.length ?? 0);
      case 'least-comments':
        return (a.comments?.length ?? 0) - (b.comments?.length ?? 0);
      default:
        return 0;
    }
  });

  return (
    <section className='mt-6 grid gap-4'>
      {sorted.length > 0 ? (
        sorted.map((fb) => (
          <FeedbackCard key={fb.id} feedback={fb} onUpvote={onUpvote} />
        ))
      ) : (
        <p className='text-center text-sm text-[var(--text-muted)]'>
          No suggestions match your filters.
        </p>
      )}
    </section>
  );
}
