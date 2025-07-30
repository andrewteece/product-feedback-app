'use client';

import { Feedback, Status } from '@/types/feedback';
import { SortableContext } from '@dnd-kit/sortable';
import DraggableCard from './DraggableCard';
import { statusMetaMap } from '@/lib/statusMeta';

type Props = {
  status: Status;
  items: Feedback[];
  subtitle: string;
};

export default function DroppableColumn({ status, items, subtitle }: Props) {
  const { textClass, dotClass, label } = statusMetaMap[status];

  return (
    <div>
      <header className='mb-6'>
        <h2
          className={`flex items-center gap-2 text-lg font-bold ${textClass}`}
        >
          <span className={`h-2 w-2 rounded-full ${dotClass}`} />
          {label}{' '}
          <span className='text-[var(--text-muted)]'>({items.length})</span>
        </h2>
        <p className='text-sm text-[var(--text-muted)]'>{subtitle}</p>
      </header>

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
