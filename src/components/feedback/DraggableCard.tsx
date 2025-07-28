'use client';

import { Feedback } from '@/types/feedback';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { MessageSquare } from 'lucide-react';

interface Props {
  feedback: Feedback;
}

const categoryColors: Record<string, string> = {
  feature: 'bg-[var(--badge-bg)] text-[var(--text-primary)]',
  ui: 'bg-[#FCEADE] text-[#D73737]',
  ux: 'bg-[#EDEFF7] text-[var(--text-primary)]',
  enhancement: 'bg-[#F4F0FF] text-[#AD1FEA]',
  bug: 'bg-[#FCD8D8] text-[#D73737]',
};

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
        'bg-[var(--bg-card)] p-5 rounded-lg shadow-md border border-[var(--border-card)]',
        'cursor-grab select-none transition hover:shadow-lg',
        isDragging && 'border-dashed opacity-50'
      )}
    >
      <span
        className={clsx(
          'inline-block text-xs font-medium capitalize px-3 py-1 rounded-full mb-2 w-fit',
          categoryColors[feedback.category.toLowerCase()] ||
            'bg-[var(--badge-bg)] text-[var(--text-primary)]'
        )}
      >
        {feedback.category}
      </span>

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
        <div className='flex items-center gap-1 text-sm text-[var(--text-muted)]'>
          <MessageSquare className='w-4 h-4' />
          {feedback.comments?.length ?? 0}
        </div>
      </div>
    </div>
  );
}
