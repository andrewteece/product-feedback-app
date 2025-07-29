'use client';

import { Feedback } from '@/types/feedback';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { MessageSquare } from 'lucide-react';
import ArrowUpIcon from '@/assets/icons/icon-arrow-up.svg';
import { useFeedbackStore } from '@/store/feedbackStore'; // Zustand hook

interface Props {
  feedback: Feedback;
}

const topBorderColorMap = {
  planned: 'border-t-[6px] border-t-[#F49F85]',
  'in-progress': 'border-t-[6px] border-t-[#AD1FEA]',
  live: 'border-t-[6px] border-t-[#62BCFA]',
} as const;

const statusColorMap = {
  planned: 'bg-[#F49F85]',
  'in-progress': 'bg-[#AD1FEA]',
  live: 'bg-[#62BCFA]',
} as const;

export default function DraggableCard({ feedback }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: feedback.id.toString() });

  const toggleUpvote = useFeedbackStore((s) => s.toggleUpvote); // ✅ Zustand function

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const safeStatus = feedback.status as keyof typeof topBorderColorMap;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={clsx(
        'rounded-md bg-white px-6 py-5 shadow-sm border transition',
        'flex flex-col gap-3 justify-between',
        'border-[var(--border-card)]',
        isDragging && 'border-dashed opacity-50',
        topBorderColorMap[safeStatus]
      )}
    >
      {/* Status Label */}
      <div className='flex items-center gap-2 text-sm text-[var(--text-muted)] font-medium'>
        <span
          className={clsx('h-2 w-2 rounded-full', statusColorMap[safeStatus])}
        />
        {feedback.status
          ?.replace('-', ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase())}
      </div>

      {/* Title + Description */}
      <div className='flex flex-col gap-1.5'>
        <h3 className='text-base font-bold text-[var(--text-primary)]'>
          {feedback.title}
        </h3>
        <p className='text-sm text-[var(--text-muted)]'>
          {feedback.description}
        </p>
      </div>

      {/* Category + Footer */}
      <div className='flex justify-between items-center mt-1'>
        <span className='bg-[var(--badge-bg)] text-[var(--text-primary)] text-xs font-semibold px-3 py-1 rounded-full capitalize'>
          {feedback.category}
        </span>

        <div className='flex items-center gap-4'>
          <button
            onClick={() => {
              console.log('[UI] Toggling upvote for', feedback.id);
              toggleUpvote(feedback.id);
            }}
            className={clsx(
              'flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-bold shadow-sm transition hover:brightness-95',
              feedback.upvoted
                ? 'bg-[hsl(var(--color-primary))] text-white'
                : 'bg-white text-[var(--text-primary)]'
            )}
          >
            <ArrowUpIcon className='w-3 h-3' />
            {feedback.upvotes}
          </button>

          <div className='flex items-center gap-1 text-sm font-semibold text-[var(--text-primary)]'>
            <MessageSquare className='w-4 h-4' />
            {feedback.comments?.length ?? 0}
          </div>
        </div>
      </div>
    </div>
  );
}
