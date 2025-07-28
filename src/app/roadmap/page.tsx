'use client';

import { useEffect, useState } from 'react';
import { useFeedbackStore } from '@/store/feedbackStore';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import DroppableColumn from '@/components/feedback/DroppableColumn';
import { Status } from '@/types/feedback';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type RoadmapStatus = Exclude<Status, 'suggestion'>;
const columns: RoadmapStatus[] = ['planned', 'in-progress', 'live'];

export default function RoadmapPage() {
  const { feedback, updateStatus } = useFeedbackStore();
  const [columnData, setColumnData] = useState<
    Record<RoadmapStatus, typeof feedback>
  >({
    planned: [],
    'in-progress': [],
    live: [],
  });

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    const grouped = {
      planned: feedback.filter((f) => f.status === 'planned'),
      'in-progress': feedback.filter((f) => f.status === 'in-progress'),
      live: feedback.filter((f) => f.status === 'live'),
    };
    setColumnData(grouped);
  }, [feedback]);

  const handleDragEnd = (event: DragEndEvent) => {
    const activeId = event.active.id.toString();
    const overId = event.over?.id?.toString() as RoadmapStatus;

    const dragged = feedback.find((f) => f.id.toString() === activeId);
    if (dragged && dragged.status !== overId) {
      updateStatus(dragged.id, overId);
    }
  };

  return (
    <main className='p-4 sm:p-6 md:p-10'>
      {/* Top Navigation Header */}
      <div className='flex flex-col md:flex-row items-center justify-between bg-indigo-900 rounded-xl p-4 md:p-6 mb-12 gap-4'>
        <Link
          href='/'
          className='text-[var(--text-on-primary)] font-semibold flex items-center gap-2'
        >
          <ArrowLeft className='w-4 h-4' /> Go Back
        </Link>
        <h1 className='text-xl font-bold text-[var(--text-on-primary)]'>
          Roadmap
        </h1>
        <Link href='/new'>
          <Button className='bg-[var(--button-primary)] hover:bg-[var(--button-primary-hover)] text-[var(--text-on-primary)]'>
            + Add Feedback
          </Button>
        </Link>
      </div>

      {/* Roadmap Columns */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className='grid gap-6 md:grid-cols-3'>
          {columns.map((status) => (
            <DroppableColumn
              key={status}
              status={status}
              items={columnData[status]}
            />
          ))}
        </div>
      </DndContext>
    </main>
  );
}
