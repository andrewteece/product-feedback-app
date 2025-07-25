import type { Comment } from '@/types/feedback';
import AddCommentForm from './AddCommentForm';

export default function CommentSection({
  comments,
  feedbackId,
}: {
  comments: Comment[];
  feedbackId: number;
}) {
  return (
    <div className='mt-6'>
      <h2 className='text-lg font-semibold mb-4'>{comments.length} Comments</h2>

      {comments.map((comment) => (
        <div key={comment.id} className='mb-4 border-b pb-2'>
          <p className='font-bold'>{comment.user.name}</p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            @{comment.user.username}
          </p>
          <p className='mt-1'>{comment.content}</p>
        </div>
      ))}

      <AddCommentForm feedbackId={feedbackId} />
    </div>
  );
}
