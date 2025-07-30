'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import DroppableColumn from '@/components/feedback/DroppableColumn';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Status } from '@/types/feedback';

export default function RoadmapPage() {
  const feedback = useFeedbackStore((s) => s.feedback);
  const updateStatus = useFeedbackStore((s) => s.updateStatus);

  const planned = feedback.filter((f) => f.status === 'planned');
  const inProgress = feedback.filter((f) => f.status === 'in-progress');
  const live = feedback.filter((f) => f.status === 'live');

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
    <>
      <h1 className='sr-only'>Roadmap</h1>

      <DndContext onDragEnd={onDragEnd}>
        <section className='grid gap-6 md:grid-cols-3'>
          <DroppableColumn
            status='planned'
            items={planned}
            subtitle='Ideas prioritized for research'
          />
          <DroppableColumn
            status='in-progress'
            items={inProgress}
            subtitle='Currently being developed'
          />
          <DroppableColumn
            status='live'
            items={live}
            subtitle='Released features'
          />
        </section>
      </DndContext>
    </>
  );
}
