'use client';

import { useEffect, useMemo } from 'react';
import { useFeedbackStore } from '@/store/feedbackStore';
import { mockFeedbacks } from '@/lib/mockFeedbackData';

export default function FeedbackList() {
  const feedbacks = useFeedbackStore((s) => s.feedbacks);
  const setFeedbacks = useFeedbackStore((s) => s.setFeedbacks);
  const selectedCategory = useFeedbackStore((s) => s.selectedCategory);
  const sortOption = useFeedbackStore((s) => s.sortOption);

  // Seed mock data on first load
  useEffect(() => {
    if (feedbacks.length === 0) {
      setFeedbacks(mockFeedbacks);
    }
  }, [setFeedbacks, feedbacks]);

  // Filter + Sort memoized
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
        visibleFeedbacks.map((fb) => (
          <article
            key={fb.id}
            className='border border-slate-200 dark:border-slate-700 p-4 rounded-lg shadow-sm hover:shadow transition'
          >
            <div className='flex justify-between items-start gap-4'>
              <div>
                <h2 className='text-lg font-semibold'>{fb.title}</h2>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  {fb.description}
                </p>
                <span className='inline-block mt-2 text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded'>
                  {fb.category}
                </span>
              </div>
              <button className='min-w-[3rem] px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600'>
                ▲ {fb.upvotes}
              </button>
            </div>
          </article>
        ))
      )}
    </section>
  );
}
