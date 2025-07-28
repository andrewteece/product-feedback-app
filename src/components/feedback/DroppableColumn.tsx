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
  suggestion: 'Suggestion',
  planned: 'Planned',
  'in-progress': 'In-Progress',
  live: 'Live',
};

const statusDescriptions: Record<Status, string> = {
  suggestion: '',
  planned: 'Ideas prioritized for research',
  'in-progress': 'Currently being developed',
  live: 'Released features',
};

const statusColors: Record<Status, string> = {
  suggestion: 'border-gray-300',
  planned: 'border-[#F49F85]',
  'in-progress': 'border-[#AD1FEA]',
  live: 'border-[#62BCFA]',
};

export default function DroppableColumn({ status, items, children }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div>
      <div className='mb-4'>
        <h2 className='text-lg font-bold text-[var(--text-primary)] capitalize'>
          {statusLabels[status]} ({items.length})
        </h2>
        {status !== 'suggestion' && (
          <p className='text-sm text-[var(--text-muted)]'>
            {statusDescriptions[status]}
          </p>
        )}
      </div>

      <div
        ref={setNodeRef}
        className={clsx(
          'min-h-[300px] flex flex-col gap-4 p-4 rounded-lg transition',
          'bg-[var(--bg-card)] border-t-4',
          isOver ? 'ring-2 ring-[var(--btn-primary)]' : '',
          statusColors[status]
        )}
      >
        {children}
      </div>
    </div>
  );
}
