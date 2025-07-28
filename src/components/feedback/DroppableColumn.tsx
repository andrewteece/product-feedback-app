'use client';

import { useDroppable } from '@dnd-kit/core';
import type { Feedback, Status } from '@/types/feedback';
import DraggableCard from './DraggableCard';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type Props = {
  status: Exclude<Status, 'suggestion'>;
  items: Feedback[];
};

const statusMeta = {
  planned: {
    title: 'Planned',
    description: 'Ideas prioritized for research',
    color: 'bg-[#F49F85]',
  },
  'in-progress': {
    title: 'In-Progress',
    description: 'Currently being developed',
    color: 'bg-[#AD1FEA]',
  },
  live: {
    title: 'Live',
    description: 'Released features',
    color: 'bg-[#62BCFA]',
  },
} as const;

export default function DroppableColumn({ status, items }: Props) {
  const { setNodeRef } = useDroppable({ id: status });
  const meta = statusMeta[status];

  return (
    <section>
      {/* Heading */}
      <div className='mb-4'>
        <h2 className='text-lg font-bold text-[#3A4374] dark:text-white'>
          {meta.title} ({items.length})
        </h2>
        <p className='text-sm text-[#647196] mb-2'>{meta.description}</p>
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
