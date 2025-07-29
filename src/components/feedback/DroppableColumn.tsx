'use client';

import { Feedback, Status } from '@/types/feedback';
import { SortableContext } from '@dnd-kit/sortable';
import DraggableCard from './DraggableCard';
import { cn } from '@/lib/utils';

type Props = {
  status: Status;
  items: Feedback[];
  title: string;
  subtitle: string;
  color: string;
};

export default function DroppableColumn({
  status,
  items,
  title,
  subtitle,
  color,
}: Props) {
  console.log('[DroppableColumn] status:', status);

  return (
    <div>
      <div className='mb-6'>
        <h2 className={cn('text-lg font-bold', color)}>
          {title}{' '}
          <span className='text-zinc-500 dark:text-zinc-400'>
            ({items.length})
          </span>
        </h2>
        <p className='text-sm text-zinc-500 dark:text-zinc-400'>{subtitle}</p>
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
