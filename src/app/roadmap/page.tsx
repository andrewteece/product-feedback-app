'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import { Status } from '@/types/feedback';
import { useEffect, useState } from 'react';
import DraggableCard from '@/components/feedback/DraggableCard';
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import DroppableColumn from '@/components/feedback/DroppableColumn';

const columns: Status[] = ['planned', 'in-progress', 'live'];

export default function RoadmapPage() {
  const { feedback, updateStatus } = useFeedbackStore();
  const [columnData, setColumnData] = useState<Record<Status, typeof feedback>>(
    {
      planned: [],
      'in-progress': [],
      live: [],
    }
  );

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
    const overId = event.over?.id?.toString() as Status;

    const dragged = feedback.find((f) => f.id.toString() === activeId);
    if (dragged && dragged.status !== overId) {
      updateStatus(dragged.id, overId);
    }
  };

  return (
    <div className='p-4 md:p-6'>
      <h1 className='text-2xl font-bold mb-6'>Roadmap</h1>

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
            >
              <SortableContext
                items={columnData[status]}
                strategy={verticalListSortingStrategy}
              >
                {columnData[status].length > 0 ? (
                  columnData[status].map((item) => (
                    <DraggableCard key={item.id} feedback={item} />
                  ))
                ) : (
                  <p className='text-sm text-muted italic'>No feedback yet.</p>
                )}
              </SortableContext>
            </DroppableColumn>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
