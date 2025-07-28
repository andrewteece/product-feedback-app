'use client';

import { Feedback } from '@/types/feedback';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { MessageSquare } from 'lucide-react';

interface Props {
  feedback: Feedback;
}

const topBorderColor: Record<string, string> = {
  planned: 'border-t-[6px] border-t-[#F49F85]',
  'in-progress': 'border-t-[6px] border-t-[#AD1FEA]',
  live: 'border-t-[6px] border-t-[#62BCFA]',
  suggestion: '',
};

const categoryColors: Record<string, string> = {
  feature: 'bg-[#E0F1FE] text-[#4661E6]',
  ui: 'bg-[#FCEADE] text-[#D73737]',
  ux: 'bg-[#EDEFF7] text-[#373F68]',
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
        'bg-white rounded-md p-6 border border-[#E1E3EA] shadow-sm cursor-grab transition flex flex-col h-full',
        topBorderColor[feedback.status],
        isDragging && 'border-dashed opacity-50'
      )}
    >
      {/* Status Tag */}
      {feedback.status !== 'suggestion' && (
        <div className='text-xs text-[var(--text-muted)] font-semibold flex items-center gap-2 mb-2'>
          <span
            className={clsx('w-2 h-2 rounded-full', {
              'bg-[#F49F85]': feedback.status === 'planned',
              'bg-[#AD1FEA]': feedback.status === 'in-progress',
              'bg-[#62BCFA]': feedback.status === 'live',
            })}
          />
          <span className='capitalize'>{feedback.status}</span>
        </div>
      )}

      <h3 className='text-base font-bold text-[var(--text-primary)] mb-1'>
        {feedback.title}
      </h3>
      <p className='text-sm text-[var(--text-muted)] mb-4'>
        {feedback.description}
      </p>

      <span
        className={clsx(
          'inline-block text-xs font-medium capitalize px-3 py-1 rounded-full mb-4 w-fit',
          categoryColors[feedback.category.toLowerCase()] ||
            'bg-[var(--badge-bg)] text-[var(--text-primary)]'
        )}
      >
        {feedback.category}
      </span>

      <div className='flex justify-between items-center mt-auto'>
        <div className='flex items-center gap-2 bg-[#F2F4FE] px-3 py-1 rounded-md text-sm text-[#3A4374] font-semibold'>
          ▲ {feedback.upvotes}
        </div>
        <div className='flex items-center gap-1 text-sm text-[#647196] font-semibold'>
          <MessageSquare className='w-4 h-4' />
          {feedback.comments?.length ?? 0}
        </div>
      </div>
    </div>
  );
}
