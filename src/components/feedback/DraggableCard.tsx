'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import { Feedback } from '@/types/feedback';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
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
    useSortable({ id: feedback.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!liveFeedback) return null;

  const upvoted = liveFeedback.upvoted;

  return (
    <motion.div
      layout
      ref={setNodeRef}
      style={style}
      className='rounded-xl bg-[var(--bg-card)] p-6 shadow-md transition-colors'
    >
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h3 className='text-base font-bold text-[var(--text-primary)]'>
            {liveFeedback.title}
          </h3>
          <p className='mt-1 text-sm text-[var(--text-muted)]'>
            {liveFeedback.description}
          </p>
        </div>

        <button
          onClick={() => toggleUpvote(liveFeedback.id)}
          className={`flex flex-col items-center justify-center rounded-md px-2 py-1 text-sm font-semibold ${
            upvoted
              ? 'bg-[var(--btn-primary)] text-white'
              : 'bg-[var(--badge-bg)] text-[var(--text-muted)]'
          }`}
        >
          ▲<span>{liveFeedback.upvotes}</span>
        </button>
      </div>

      <div className='mt-4 flex items-center justify-between text-sm text-[var(--text-muted)]'>
        <span className='capitalize'>{liveFeedback.category}</span>

        <div className='flex items-center gap-2' {...attributes} {...listeners}>
          <GripVertical className='h-4 w-4 opacity-50' />
          Drag
        </div>
      </div>
    </motion.div>
  );
}
