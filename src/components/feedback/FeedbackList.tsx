'use client';

import { useEffect, useMemo } from 'react';
import { useFeedbackStore } from '@/store/feedbackStore';
import data from '@/lib/data/data.json';
import FeedbackCard from '@/components/feedback/FeedbackCard';

export default function FeedbackList() {
  const feedback = useFeedbackStore((s) => s.feedback);
  const setFeedback = useFeedbackStore((s) => s.setFeedback);
  const selectedCategory = useFeedbackStore((s) => s.selectedCategory);
  const sortOption = useFeedbackStore((s) => s.sortOption);

  useEffect(() => {
    if (feedback.length === 0) {
      setFeedback(data.productRequests);
    }
  }, [feedback, setFeedback]);

  const visibleFeedbacks = useMemo(() => {
    const filtered =
      selectedCategory === 'All'
        ? feedback
        : feedback.filter((f) => f.category === selectedCategory);

    switch (sortOption) {
      case 'Most Upvotes':
        return filtered.sort((a, b) => b.upvotes - a.upvotes);
      case 'Least Upvotes':
        return filtered.sort((a, b) => a.upvotes - b.upvotes);
      case 'Most Comments':
        return filtered.sort(
          (a, b) => (b.comments?.length || 0) - (a.comments?.length || 0)
        );
      case 'Least Comments':
        return filtered.sort(
          (a, b) => (a.comments?.length || 0) - (b.comments?.length || 0)
        );
      default:
        return filtered;
    }
  }, [feedback, selectedCategory, sortOption]);

  return (
    <section className='space-y-4'>
      {visibleFeedbacks.length === 0 ? (
        <p className='text-center text-gray-500'>No feedback found.</p>
      ) : (
        visibleFeedbacks.map((fb) => <FeedbackCard key={fb.id} feedback={fb} />)
      )}
    </section>
  );
}
