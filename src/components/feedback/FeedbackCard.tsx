'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Feedback } from '@/types/feedback';

interface FeedbackCardProps {
  feedback: Feedback;
  onUpvote?: (id: number) => void;
}

export default function FeedbackCard({
  feedback,
  onUpvote,
}: FeedbackCardProps) {
  return (
    <article className='border border-[var(--border-card)] p-4 rounded-lg shadow-sm hover:shadow transition bg-[var(--bg-card)] text-[var(--text-primary)]'>
      <div className='flex justify-between items-start gap-4'>
        <div className='flex-1'>
          <Link href={`/feedback/${feedback.id}`}>
            <h2 className='text-lg font-semibold hover:underline'>
              {feedback.title}
            </h2>
          </Link>
          <p className='text-sm text-[var(--text-muted)] mt-1'>
            {feedback.description}
          </p>
          <span className='inline-block mt-3 text-xs bg-[var(--badge-bg)] px-3 py-1 rounded text-[var(--text-primary)] capitalize'>
            {feedback.category}
          </span>
        </div>

        <div className='flex flex-col items-center justify-between gap-2'>
          <button
            onClick={() => onUpvote?.(feedback.id)}
            className={`px-2 py-1 rounded text-sm font-semibold min-w-[3rem] transition ${
              feedback.upvoted
                ? 'bg-[var(--btn-primary)] text-white'
                : 'bg-[var(--badge-bg)] text-[var(--text-primary)]'
            }`}
            aria-label={`Upvote ${feedback.title}`}
          >
            ▲ {feedback.upvotes}
          </button>

          <div className='flex items-center gap-1 text-sm text-[var(--text-primary)]'>
            <Image
              src='/assets/icons/icon-comments.svg'
              alt='Comment icon'
              width={16}
              height={16}
            />
            {feedback.comments?.length ?? 0}
          </div>
        </div>
      </div>
    </article>
  );
}
