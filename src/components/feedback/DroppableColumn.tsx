'use client';

import { Status } from '@/types/feedback';
import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  status: Status;
  items: unknown[];
}

const statusLabels: Record<Status, string> = {
  planned: 'Planned',
  'in-progress': 'In-Progress',
  live: 'Live',
};

const statusColors: Record<Status, string> = {
  planned: 'border-pink-500',
  'in-progress': 'border-orange-500',
  live: 'border-teal-500',
};

export default function DroppableColumn({ status, children }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div>
      <h2 className='text-lg font-bold mb-4 text-[var(--text-primary)] capitalize'>
        {statusLabels[status]} (
        {children && Array.isArray(children) ? children.length : ''})
      </h2>

      <div
        ref={setNodeRef}
        className={clsx(
          'min-h-[300px] flex flex-col gap-4 p-4 rounded-lg transition',
          'bg-[var(--bg-card)]',
          isOver ? 'ring-2 ring-[var(--btn-primary)]' : '',
          statusColors[status]
        )}
      >
        {children}
      </div>
    </div>
  );
}
