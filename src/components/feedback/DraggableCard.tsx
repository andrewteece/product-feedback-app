'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import { Feedback } from '@/types/feedback';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import UpvoteButton from '@/components/ui/UpvoteButton';
import CategoryBadge from '@/components/ui/CategoryBadge';

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

        <UpvoteButton
          count={liveFeedback.upvotes}
          upvoted={upvoted}
          onClick={() => toggleUpvote(liveFeedback.id)}
        />
      </div>

      <div className='mt-4 flex items-center justify-between text-sm text-[var(--text-muted)]'>
        <CategoryBadge category={liveFeedback.category} />

        <div className='flex items-center gap-2' {...attributes} {...listeners}>
          <GripVertical className='h-4 w-4 opacity-50' />
          Drag
        </div>
      </div>
    </motion.div>
  );
}
