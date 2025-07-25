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
    <section className='max-w-2xl mx-auto space-y-6 text-[var(--text-primary)]'>
      <div className='border border-[var(--border-card)] p-4 rounded shadow bg-[var(--bg-card)]'>
        <h1 className='text-xl font-bold'>{feedback.title}</h1>
        <p className='text-[var(--text-muted)]'>{feedback.description}</p>

        <div className='flex items-center gap-4 mt-2'>
          <span className='bg-[var(--badge-bg)] px-2 py-1 rounded text-sm'>
            Category: {feedback.category}
          </span>
          <span className='text-sm text-[var(--btn-primary)]'>
            {feedback.status}
          </span>
        </div>

        <button className='mt-4 px-4 py-2 bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-white rounded'>
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
