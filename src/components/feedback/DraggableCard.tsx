'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import { Feedback } from '@/types/feedback';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type Props = {
  feedback: Feedback;
};

export default function DraggableCard({ feedback }: Props) {
  const liveFeedback = useFeedbackStore((s) =>
    s.feedback.find((f) => f.id === feedback.id)
  );
  const toggleUpvote = useFeedbackStore((s) => s.toggleUpvote);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: feedback.id.toString(),
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!liveFeedback) return null;

  console.log('[render] upvotes:', liveFeedback.id, liveFeedback.upvotes);

  return (
    <motion.div
      layout
      ref={setNodeRef}
      style={style}
      className='rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900'
    >
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h3 className='text-base font-bold text-zinc-800 dark:text-zinc-100'>
            {liveFeedback.title}
          </h3>
          <p className='mt-1 text-sm text-zinc-500 dark:text-zinc-400'>
            {liveFeedback.description}
          </p>
        </div>

        <button
          onClick={() => toggleUpvote(liveFeedback.id)}
          className={cn(
            'flex flex-col items-center justify-center rounded-md px-2 py-1 text-sm font-semibold',
            liveFeedback.upvoted
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
          )}
        >
          ▲<span>{liveFeedback.upvotes}</span>
        </button>
      </div>

      <div className='mt-4 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400'>
        <span className='capitalize'>{liveFeedback.category}</span>

        <div className='flex items-center gap-2' {...attributes} {...listeners}>
          <GripVertical className='h-4 w-4 opacity-50' />
          Drag
        </div>
      </div>
    </motion.div>
  );
}
