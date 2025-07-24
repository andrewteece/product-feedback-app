'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFeedbackStore } from '@/store/feedbackStore';
import type { Category } from '@/types/feedback';
import { useRouter } from 'next/navigation';

const categories: Category[] = ['UI', 'UX', 'Enhancement', 'Bug', 'Feature'];

const schema = z.object({
  title: z.string().min(3, 'Title is required'),
  category: z.enum(categories),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function FeedbackForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const addFeedback = useFeedbackStore((s) => s.addFeedback);
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    const newFeedback = {
      id: Date.now(),
      status: 'Suggestion',
      upvotes: 0,
      comments: [],
      ...data,
    };
    addFeedback(newFeedback);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label className='block font-medium'>Title</label>
        <input
          {...register('title')}
          className='w-full border rounded px-3 py-2'
          placeholder='Add a short, descriptive title'
        />
        {errors.title && (
          <p className='text-sm text-red-500'>{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className='block font-medium'>Category</label>
        <select
          {...register('category')}
          className='w-full border rounded px-3 py-2'
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className='text-sm text-red-500'>{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className='block font-medium'>Description</label>
        <textarea
          {...register('description')}
          rows={5}
          className='w-full border rounded px-3 py-2'
          placeholder='Include any specific comments on what should be improved, added, etc.'
        />
        {errors.description && (
          <p className='text-sm text-red-500'>{errors.description.message}</p>
        )}
      </div>

      <button
        type='submit'
        className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
      >
        Submit Feedback
      </button>
    </form>
  );
}
