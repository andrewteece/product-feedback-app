'use client';

import Link from 'next/link';
import type { Feedback } from '@/types/feedback';

export default function FeedbackCard({ feedback }: { feedback: Feedback }) {
  return (
    <article className='border border-slate-200 dark:border-slate-700 p-4 rounded-lg shadow-sm hover:shadow transition'>
      <div className='flex justify-between items-start gap-4'>
        <div>
          <Link href={`/feedback/${feedback.id}`}>
            <h2 className='text-lg font-semibold hover:underline'>
              {feedback.title}
            </h2>
          </Link>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            {feedback.description}
          </p>
          <span className='inline-block mt-2 text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded'>
            {feedback.category}
          </span>
        </div>
        <button className='min-w-[3rem] px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600'>
          ▲ {feedback.upvotes}
        </button>
      </div>
    </article>
  );
}
