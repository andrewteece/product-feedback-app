'use client';

import { useEffect, useMemo } from 'react';
import { useFeedbackStore } from '@/store/feedbackStore';
import { mockFeedbacks } from '@/lib/mockFeedbackData';
import FeedbackCard from '@/components/feedback/FeedbackCard';

export default function FeedbackList() {
  const feedbacks = useFeedbackStore((s) => s.feedbacks);
  const setFeedbacks = useFeedbackStore((s) => s.setFeedbacks);
  const selectedCategory = useFeedbackStore((s) => s.selectedCategory);
  const sortOption = useFeedbackStore((s) => s.sortOption);

  // Seed mock data only if localStorage is empty
  useEffect(() => {
    if (feedbacks.length === 0) {
      setFeedbacks(mockFeedbacks);
    }
  }, [feedbacks, setFeedbacks]);

  const visibleFeedbacks = useMemo(() => {
    const filtered =
      selectedCategory === 'All'
        ? feedbacks
        : feedbacks.filter((f) => f.category === selectedCategory);

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
  }, [feedbacks, selectedCategory, sortOption]);

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
