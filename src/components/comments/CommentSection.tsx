'use client';

import type { Comment } from '@/types/feedback';
import AddCommentForm from './AddCommentForm';
import CommentCard from './CommentCard';

interface CommentSectionProps {
  feedbackId: number;
  comments: Comment[];
}

export default function CommentSection({
  feedbackId,
  comments,
}: CommentSectionProps) {
  return (
    <section className='space-y-6'>
      <h2 className='text-lg font-semibold'>
        {comments.length} Comment{comments.length !== 1 ? 's' : ''}
      </h2>

      <ul className='space-y-4'>
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            feedbackId={feedbackId}
          />
        ))}
      </ul>

      <AddCommentForm feedbackId={feedbackId} />
    </section>
  );
}
