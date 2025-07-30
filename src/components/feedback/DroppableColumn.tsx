'use client';

import { Feedback, Status } from '@/types/feedback';
import { SortableContext } from '@dnd-kit/sortable';
import DraggableCard from './DraggableCard';

type Props = {
  status: Status;
  items: Feedback[];
  title: string;
  subtitle: string;
};

const statusColors: Record<Status, string> = {
  suggestion: 'var(--status-planned)',
  planned: 'var(--status-planned)',
  'in-progress': 'var(--status-inprogress)',
  live: 'var(--status-live)',
};

export default function DroppableColumn({
  status,
  items,
  title,
  subtitle,
}: Props) {
  const color = statusColors[status];

  return (
    <div>
      <div className='mb-6'>
        <h2 className='text-lg font-bold' style={{ color }}>
          {title}{' '}
          <span className='text-[var(--text-muted)]'>({items.length})</span>
        </h2>
        <p className='text-sm text-[var(--text-muted)]'>{subtitle}</p>
      </div>

      <SortableContext items={items.map((f) => f.id.toString())}>
        <div className='space-y-4'>
          {items.map((feedback) => (
            <DraggableCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
