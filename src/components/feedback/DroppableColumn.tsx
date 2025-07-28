'use client';

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import DraggableCard from './DraggableCard';
import type { Feedback, Status } from '@/types/feedback';

type Props = {
  status: Exclude<Status, 'suggestion'>;
  items: Feedback[];
};

const statusMeta = {
  planned: {
    title: 'Planned',
    description: 'Ideas prioritized for research',
    color: 'bg-[var(--status-planned)]',
  },
  'in-progress': {
    title: 'In-Progress',
    description: 'Currently being developed',
    color: 'bg-[var(--status-inprogress)]',
  },
  live: {
    title: 'Live',
    description: 'Released features',
    color: 'bg-[var(--status-live)]',
  },
} as const;

export default function DroppableColumn({ status, items }: Props) {
  const { setNodeRef } = useDroppable({ id: status });
  const meta = statusMeta[status];

  return (
    <section className='w-full'>
      {/* Heading */}
      <div className='mb-6'>
        <h2 className='text-[18px] font-bold text-[var(--text-primary)] dark:text-white'>
          {meta.title} ({items.length})
        </h2>
        <p className='text-sm text-[var(--text-muted)] mb-4'>
          {meta.description}
        </p>
        <div className={`h-1 w-full rounded-full ${meta.color}`} />
      </div>

      {/* Cards */}
      <div ref={setNodeRef} className='flex flex-col gap-6'>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((feedback) => (
            <DraggableCard key={feedback.id} feedback={feedback} />
          ))}
        </SortableContext>
      </div>
    </section>
  );
}
