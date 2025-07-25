'use client';

import { notFound, useParams } from 'next/navigation';
import { useFeedbackStore } from '@/store/feedbackStore';
import CommentSection from '@/components/comments/CommentSection';

export default function FeedbackDetailPage() {
  const params = useParams();
  const id = Number(params?.id);

  const feedback = useFeedbackStore((state) =>
    state.feedbacks.find((f) => f.id === id)
  );

  if (!feedback) {
    return notFound();
  }

  return (
    <section className='max-w-2xl mx-auto space-y-6'>
      <div className='border p-4 rounded shadow bg-white dark:bg-darkBlue'>
        <h1 className='text-xl font-bold text-darkBlue dark:text-white'>
          {feedback.title}
        </h1>
        <p className='text-gray-600 dark:text-gray-300'>
          {feedback.description}
        </p>

        <div className='flex items-center gap-4 mt-2'>
          <span className='bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm'>
            Category: {feedback.category}
          </span>
          <span className='text-sm text-blue-500'>{feedback.status}</span>
        </div>

        <button className='mt-4 px-4 py-2 bg-blue-600 text-white rounded'>
          ▲ {feedback.upvotes}
        </button>
      </div>

      <CommentSection
        comments={feedback.comments ?? []}
        feedbackId={feedback.id}
      />
    </section>
  );
}
