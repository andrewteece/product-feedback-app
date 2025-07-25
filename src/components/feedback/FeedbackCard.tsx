'use client';

import Link from 'next/link';
import type { Feedback } from '@/types/feedback';

export default function FeedbackCard({ feedback }: { feedback: Feedback }) {
  return (
    <article className='border border-[var(--border-card)] p-4 rounded-lg shadow-sm hover:shadow transition bg-[var(--bg-card)] text-[var(--text-primary)]'>
      <div className='flex justify-between items-start gap-4'>
        <div>
          <Link href={`/feedback/${feedback.id}`}>
            <h2 className='text-lg font-semibold hover:underline'>
              {feedback.title}
            </h2>
          </Link>
          <p className='text-sm text-[var(--text-muted)]'>
            {feedback.description}
          </p>
          <span className='inline-block mt-2 text-xs bg-[var(--badge-bg)] px-2 py-1 rounded text-[var(--text-primary)]'>
            {feedback.category}
          </span>
        </div>
        <button className='min-w-[3rem] px-2 py-1 bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-white rounded text-sm'>
          ▲ {feedback.upvotes}
        </button>
      </div>
    </article>
  );
}
