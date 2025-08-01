'use client';

import { useMemo } from 'react';
import { useFeedbackStore } from '@/store/feedbackStore';
import FeedbackCard from '@/components/feedback/FeedbackCard';

export default function FeedbackList() {
  const feedback = useFeedbackStore((s) => s.feedback);
  const selectedCategory = useFeedbackStore((s) => s.selectedCategory);
  const sortOption = useFeedbackStore((s) => s.sortOption);

  const visibleFeedback = useMemo(() => {
    const filtered =
      selectedCategory === 'all'
        ? feedback
        : feedback.filter((f) => f.category === selectedCategory);

    switch (sortOption) {
      case 'most-upvotes':
        return filtered.sort((a, b) => b.upvotes - a.upvotes);
      case 'least-upvotes':
        return filtered.sort((a, b) => a.upvotes - b.upvotes);
      case 'most-comments':
        return filtered.sort(
          (a, b) => (b.comments?.length || 0) - (a.comments?.length || 0)
        );
      case 'least-comments':
        return filtered.sort(
          (a, b) => (a.comments?.length || 0) - (b.comments?.length || 0)
        );
      default:
        return filtered;
    }
  }, [feedback, selectedCategory, sortOption]);

  return (
    <section className='space-y-4'>
      {visibleFeedback.length === 0 ? (
        <p className='text-center text-gray-500'>No feedback found.</p>
      ) : (
        visibleFeedback.map((fb) => <FeedbackCard key={fb.id} feedback={fb} />)
      )}
    </section>
  );
}
