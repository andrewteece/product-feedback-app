'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useFeedbackStore } from '@/store/feedbackStore';
import { UpvoteButton, CategoryBadge } from '@/components/ui';
import CommentSection from '@/components/comments/CommentSection';

export default function FeedbackDetailPage() {
  const params = useParams();
  const id = Number(params?.id);

  const feedback = useFeedbackStore((state) =>
    state.feedback.find((f) => f.id === id)
  );
  const toggleUpvote = useFeedbackStore((s) => s.toggleUpvote);

  if (Number.isNaN(id) || !feedback) return notFound();

  return (
    <main className='max-w-2xl mx-auto p-4 space-y-6 text-[var(--text-primary)]'>
      {/* Back Link */}
      <Link
        href='/'
        className='text-sm text-[var(--btn-primary)] hover:underline inline-block'
      >
        ← Go Back
      </Link>

      {/* Feedback Card */}
      <article
        className='border border-[var(--border-card)] p-6 rounded-xl shadow bg-[var(--bg-card)]'
        aria-labelledby={`feedback-title-${feedback.id}`}
      >
        <h1 id={`feedback-title-${feedback.id}`} className='text-xl font-bold'>
          {feedback.title}
        </h1>
        <p className='text-[var(--text-muted)] mt-1'>{feedback.description}</p>

        <div className='flex items-center gap-4 mt-4'>
          <CategoryBadge category={feedback.category} />
          <span className='text-sm text-[var(--btn-primary)] capitalize'>
            {feedback.status}
          </span>
        </div>

        <div className='mt-4'>
          <UpvoteButton
            count={feedback.upvotes}
            upvoted={feedback.upvoted ?? false}
            onClick={() => toggleUpvote(feedback.id)}
          />
        </div>
      </article>

      {/* Comments */}
      <CommentSection
        comments={feedback.comments ?? []}
        feedbackId={feedback.id}
      />
    </main>
  );
}
