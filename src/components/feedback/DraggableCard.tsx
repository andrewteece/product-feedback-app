'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import { Feedback } from '@/types/feedback';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { UpvoteButton, CategoryBadge } from '@/components/ui';
import { statusMetaMap } from '@/lib/statusMeta';
import { MessageCircle } from 'lucide-react';

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

  if (!liveFeedback) return null;

  const upvoted = liveFeedback.upvoted;
  const status = liveFeedback.status;
  const statusMeta = statusMetaMap[status];

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    borderTopColor: statusMeta.color,
  };

  return (
    <motion.div
      layout
      ref={setNodeRef}
      style={style}
      className='rounded-xl bg-[var(--bg-card)] p-6 shadow-md transition-colors border-t-4'
    >
      {/* Status label */}
      <div className='flex items-center gap-2 mb-2'>
        <span className={`h-2 w-2 rounded-full ${statusMeta.dotClass}`} />
        <span className='text-sm font-medium text-[var(--text-muted)] capitalize'>
          {statusMeta.label}
        </span>
      </div>

      {/* Title & Description */}
      <h3 className='text-base font-bold text-[var(--text-primary)]'>
        {liveFeedback.title}
      </h3>
      <p className='mt-1 text-sm text-[var(--text-muted)]'>
        {liveFeedback.description}
      </p>

      {/* Category */}
      <div className='mt-4'>
        <CategoryBadge category={liveFeedback.category} />
      </div>

      {/* Bottom Row: Upvote + Comment Count */}
      <div className='mt-4 flex items-center justify-between'>
        <UpvoteButton
          count={liveFeedback.upvotes}
          upvoted={upvoted ?? false}
          onClick={() => toggleUpvote(liveFeedback.id)}
        />

        <div
          className='flex items-center gap-1 text-sm font-semibold text-[var(--text-muted)]'
          {...attributes}
          {...listeners}
        >
          <MessageCircle className='h-4 w-4 stroke-[1.75] opacity-80' />
          {liveFeedback.comments?.length ?? 0}
        </div>
      </div>
    </motion.div>
  );
}
