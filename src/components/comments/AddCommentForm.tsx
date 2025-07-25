'use client';

import { useForm } from 'react-hook-form';
import { useFeedbackStore } from '@/store/feedbackStore';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  content: z.string().min(3, 'Comment must be at least 3 characters'),
});

type FormData = z.infer<typeof schema>;

export default function AddCommentForm({ feedbackId }: { feedbackId: number }) {
  const addComment = useFeedbackStore((s) => s.addComment);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const newComment = {
      id: Date.now(), // quick mock id
      content: data.content,
      user: {
        name: 'Guest User',
        username: 'guest',
        avatarUrl: '/avatars/avatar1.png',
      },
    };

    addComment(feedbackId, newComment);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-4'>
      <label className='block text-sm font-medium'>Add a comment</label>
      <textarea
        {...register('content')}
        rows={4}
        className='w-full border rounded px-3 py-2 dark:bg-slate-800 dark:text-white'
        placeholder='Write your comment here...'
      />
      {errors.content && (
        <p className='text-sm text-red-500'>{errors.content.message}</p>
      )}

      <button
        type='submit'
        className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
      >
        Post Comment
      </button>
    </form>
  );
}
