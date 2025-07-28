'use client';

import { Feedback } from '@/types/feedback';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { MessageSquare } from 'lucide-react';

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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Guard: Only render roadmap cards
  if (!feedback.status || feedback.status === 'suggestion') return null;

  const safeStatus = feedback.status as keyof typeof topBorderColorMap;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={clsx(
        'rounded-lg bg-white dark:bg-[color:var(--card-bg-dark)] p-6 shadow transition hover:scale-[1.01]',
        'border border-[var(--border-card)]',
        isDragging && 'border-dashed opacity-50',
        topBorderColorMap[safeStatus]
      )}
    >
      {/* Status Dot and Label */}
      <div className='flex items-center gap-2 mb-4'>
        <span
          className={clsx('h-2 w-2 rounded-full', statusColorMap[safeStatus])}
        />
        <span className='text-sm font-medium text-[color:var(--text-muted)] capitalize'>
          {feedback.status?.replace('-', ' ') ?? 'Unknown'}
        </span>
      </div>

      {/* Title & Description */}
      <h3 className='text-base font-bold text-[var(--text-primary)] mb-2'>
        {feedback.title}
      </h3>
      <p className='text-sm text-[var(--text-muted)] mb-4'>
        {feedback.description}
      </p>

      {/* Category Badge */}
      <span className='inline-block bg-[var(--badge-bg)] text-[var(--text-primary)] px-3 py-1 rounded-md text-xs font-semibold capitalize mb-4'>
        {feedback.category}
      </span>

      {/* Footer Row */}
      <div className='flex justify-between items-center'>
        {/* Upvotes */}
        <div className='flex items-center gap-2 bg-[var(--badge-bg)] px-3 py-1 rounded-md text-sm text-[var(--text-primary)]'>
          ▲ {feedback.upvotes}
        </div>

        {/* Comments */}
        <div className='flex items-center gap-1 text-sm text-[var(--text-muted)]'>
          <MessageSquare className='w-4 h-4' />
          {feedback.comments?.length ?? 0}
        </div>
      </div>
    </div>
  );
}
