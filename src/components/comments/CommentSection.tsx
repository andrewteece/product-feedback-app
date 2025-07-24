import type { Comment } from '@/types/feedback';

export default function CommentSection({ comments }: { comments: Comment[] }) {
  return (
    <div>
      <h2 className='text-lg font-semibold mb-2'>{comments.length} Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className='mb-4 border-b pb-2'>
          <p className='font-bold'>{comment.user.name}</p>
          <p className='text-sm text-gray-600'>@{comment.user.username}</p>
          <p className='mt-1'>{comment.content}</p>
        </div>
      ))}
    </div>
  );
}
