'use client';

import { useState } from 'react';
import type { Comment } from '@/types/feedback';
import { useFeedbackStore } from '@/store/feedbackStore';
import Image from 'next/image';

interface CommentSectionProps {
  feedbackId: number;
  comments: Comment[];
}

export default function CommentSection({
  feedbackId,
  comments,
}: CommentSectionProps) {
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');
  const addComment = useFeedbackStore((s) => s.addComment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (commentText.trim().length < 3) {
      setError('Comment must be at least 3 characters.');
      return;
    }

    addComment(feedbackId, commentText.trim());
    setCommentText('');
    setError('');
  };

  return (
    <section className='space-y-6'>
      <h2 className='text-lg font-semibold'>
        {comments.length} Comment{comments.length !== 1 ? 's' : ''}
      </h2>

      <ul className='space-y-4'>
        {comments.map((comment) => (
          <li
            key={comment.id}
            className='border-b border-[var(--border-card)] pb-4'
          >
            <div className='flex gap-4'>
              <Image
                src={comment.user.image}
                alt={comment.user.name}
                width={40}
                height={40}
                className='rounded-full'
                priority
              />
              <div>
                <p className='font-medium text-sm'>{comment.user.name}</p>
                <p className='text-[var(--text-muted)] text-sm'>
                  {comment.content}
                </p>

                {comment.replies && comment.replies.length > 0 && (
                  <ul className='mt-4 ml-6 space-y-2 border-l pl-4 border-[var(--border-card)]'>
                    {comment.replies.map((reply) => (
                      <li key={reply.id}>
                        <p className='text-sm font-medium'>{reply.user.name}</p>
                        <p className='text-[var(--text-muted)] text-sm'>
                          {reply.content}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
        <label htmlFor='comment' className='block font-semibold text-sm'>
          Add a Comment
        </label>
        <textarea
          id='comment'
          rows={3}
          className='w-full rounded border border-[var(--border-card)] px-3 py-2 bg-[var(--bg-card)] text-[var(--text-primary)]'
          placeholder='Write your comment here...'
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        {error && <p className='text-sm text-red-500'>{error}</p>}

        <button
          type='submit'
          className='bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-white px-4 py-2 rounded-md text-sm transition'
        >
          Post Comment
        </button>
      </form>
    </section>
  );
}
