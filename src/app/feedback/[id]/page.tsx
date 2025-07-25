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
  const toggleUpvote = useFeedbackStore((s) => s.toggleUpvote);

  if (Number.isNaN(id) || !feedback) return notFound();

  return (
    <section className='max-w-2xl mx-auto space-y-6 text-[var(--text-primary)]'>
      <article
        className='border border-[var(--border-card)] p-4 rounded shadow bg-[var(--bg-card)]'
        aria-labelledby={`feedback-title-${feedback.id}`}
      >
        <h1 id={`feedback-title-${feedback.id}`} className='text-xl font-bold'>
          {feedback.title}
        </h1>
        <p className='text-[var(--text-muted)] mt-1'>{feedback.description}</p>

        <div className='flex items-center gap-4 mt-3'>
          <span className='bg-[var(--badge-bg)] px-2 py-1 rounded text-sm capitalize'>
            {feedback.category}
          </span>
          <span className='text-sm text-[var(--btn-primary)] capitalize'>
            {feedback.status}
          </span>
        </div>

        <button
          onClick={() => toggleUpvote(feedback.id)}
          className={`mt-4 px-4 py-2 rounded transition font-semibold text-sm ${
            feedback.upvoted
              ? 'bg-[var(--btn-primary)] text-white'
              : 'bg-[var(--badge-bg)] text-[var(--text-primary)]'
          }`}
          aria-label={`Upvote ${feedback.title}`}
        >
          ▲ {feedback.upvotes}
        </button>
      </article>

      <CommentSection
        comments={feedback.comments ?? []}
        feedbackId={feedback.id}
      />
    </section>
  );
}
