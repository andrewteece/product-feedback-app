'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import DroppableColumn from '@/components/feedback/DroppableColumn';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Status } from '@/types/feedback';

export default function RoadmapPage() {
  const feedback = useFeedbackStore((s) => s.feedback);
  const updateStatus = useFeedbackStore((s) => s.updateStatus);

  // Group feedback into roadmap columns
  const planned = feedback.filter((f) => f.status === 'planned');
  const inProgress = feedback.filter((f) => f.status === 'in-progress');
  const live = feedback.filter((f) => f.status === 'live');

  // Handle DnD status change
  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const feedbackId = parseInt(active.id.toString(), 10);
    const newStatus = over.data.current?.status as Status;

    if (newStatus) {
      updateStatus(feedbackId, newStatus);
    }
  }

  return (
    <main className='mx-auto max-w-[1100px] px-4 py-12'>
      <h1 className='sr-only'>Roadmap</h1>

      <DndContext onDragEnd={onDragEnd}>
        <div className='grid gap-6 md:grid-cols-3'>
          <DroppableColumn status='planned' items={planned} />
          <DroppableColumn status='in-progress' items={inProgress} />
          <DroppableColumn status='live' items={live} />
        </div>
      </DndContext>
    </main>
  );
}
