'use client';

import { useForm } from 'react-hook-form';
import { useFeedbackStore } from '@/store/feedbackStore';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from '@/store/userStore';
import Image from 'next/image';

const schema = z.object({
  content: z
    .string()
    .min(3, 'Comment must be at least 3 characters')
    .max(250, 'Comment must be 250 characters or less'),
});

type FormData = z.infer<typeof schema>;

export default function AddCommentForm({ feedbackId }: { feedbackId: number }) {
  const addComment = useFeedbackStore((s) => s.addComment);
  const user = useUserStore((s) => s.currentUser);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const watchContent = watch('content') || '';
  const remaining = 250 - watchContent.length;

  const onSubmit = (data: FormData) => {
    const newComment = {
      id: Date.now(),
      content: data.content.trim(),
      user,
    };

    addComment(feedbackId, newComment);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-4'>
      <label className='block text-sm font-medium'>Add a Comment</label>

      <div className='flex items-start gap-3'>
        <Image
          src={user.avatarUrl}
          alt={user.username}
          width={40}
          height={40}
          className='rounded-full'
        />
        <textarea
          {...register('content')}
          rows={4}
          maxLength={250}
          className='w-full border border-[var(--border-card)] rounded px-3 py-2 bg-[var(--bg-card)] text-[var(--text-primary)] resize-none'
          placeholder='Type your comment here...'
        />
      </div>

      {errors.content && (
        <p className='text-sm text-red-500'>{errors.content.message}</p>
      )}

      <div className='flex justify-between items-center'>
        <span className='text-sm text-[var(--text-muted)]'>
          {remaining} characters left
        </span>
        <button
          type='submit'
          className='bg-[var(--btn-primary)] text-white px-4 py-2 rounded hover:bg-[var(--btn-primary-hover)] text-sm font-semibold'
        >
          Post Comment
        </button>
      </div>
    </form>
  );
}
