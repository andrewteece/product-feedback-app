'use client';

import { Feedback } from '@/types/feedback';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { MessageSquare } from 'lucide-react';

interface Props {
  feedback: Feedback;
}

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

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={clsx(
        'bg-[var(--bg-card)] p-4 rounded-md shadow-sm border',
        'cursor-grab select-none',
        isDragging && 'border-dashed'
      )}
    >
      <p className='text-sm text-[var(--text-secondary)] capitalize mb-2'>
        {feedback.category}
      </p>
      <h3 className='text-base font-semibold text-[var(--text-primary)] mb-2'>
        {feedback.title}
      </h3>
      <p className='text-sm text-[var(--text-muted)] mb-4'>
        {feedback.description}
      </p>

      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2 bg-[var(--badge-bg)] px-3 py-1 rounded-md text-sm text-[var(--text-primary)]'>
          ▲ {feedback.upvotes}
        </div>
        <div className='flex items-center gap-1 text-sm text-[var(--text-secondary)]'>
          <MessageSquare className='w-4 h-4' />
          {feedback.comments?.length ?? 0}
        </div>
      </div>
    </div>
  );
}
