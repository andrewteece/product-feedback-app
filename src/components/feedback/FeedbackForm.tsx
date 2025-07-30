'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFeedbackStore } from '@/store/feedbackStore';
import type { Category, Feedback } from '@/types/feedback';
import { useRouter } from 'next/navigation';
import { DEFAULT_STATUS } from '@/types/feedback';
import { toast } from 'sonner';

const categories: Category[] = ['ui', 'ux', 'enhancement', 'bug', 'feature'];

const schema = z.object({
  title: z.string().min(3, 'Title is required'),
  category: z.enum(categories),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

interface FeedbackFormProps {
  initialValues?: Feedback;
  onSubmitSuccess?: () => void;
}

export default function FeedbackForm({
  initialValues,
  onSubmitSuccess,
}: FeedbackFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues ?? {
      title: '',
      category: 'feature',
      description: '',
    },
  });

  const addFeedback = useFeedbackStore((s) => s.addFeedback);
  const updateFeedback = useFeedbackStore((s) => s.updateFeedback);
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    if (initialValues) {
      const updated: Feedback = {
        ...initialValues,
        ...data,
      };
      updateFeedback(updated);
      toast.success('Feedback updated!');
    } else {
      const newFeedback: Feedback = {
        id: Date.now(),
        status: DEFAULT_STATUS,
        upvotes: 0,
        upvoted: false,
        comments: [],
        ...data,
      };
      addFeedback(newFeedback);
      toast.success('Feedback added!');
    }

    reset();
    if (onSubmitSuccess) {
      onSubmitSuccess();
    } else {
      router.push('/');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-6 text-[var(--text-primary)]'
    >
      <div>
        <label htmlFor='title' className='block font-medium mb-1'>
          Title
        </label>
        <input
          id='title'
          {...register('title')}
          className='w-full border border-[var(--border-card)] rounded px-3 py-2 bg-[var(--bg-card)] text-[var(--text-primary)]'
          placeholder='Add a short, descriptive title'
        />
        {errors.title && (
          <p className='text-sm text-red-500 mt-1'>{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor='category' className='block font-medium mb-1'>
          Category
        </label>
        <select
          id='category'
          {...register('category')}
          className='w-full border border-[var(--border-card)] rounded px-3 py-2 bg-[var(--bg-card)] text-[var(--text-primary)]'
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className='text-sm text-red-500 mt-1'>{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor='description' className='block font-medium mb-1'>
          Description
        </label>
        <textarea
          id='description'
          {...register('description')}
          rows={5}
          className='w-full border border-[var(--border-card)] rounded px-3 py-2 bg-[var(--bg-card)] text-[var(--text-primary)]'
          placeholder='Include any specific comments on what should be improved, added, etc.'
        />
        {errors.description && (
          <p className='text-sm text-red-500 mt-1'>
            {errors.description.message}
          </p>
        )}
      </div>

      <button
        type='submit'
        className='bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-white px-6 py-2 rounded-md transition'
      >
        {initialValues ? 'Update Feedback' : 'Submit Feedback'}
      </button>
    </form>
  );
}
