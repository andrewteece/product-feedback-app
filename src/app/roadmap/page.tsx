'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useFeedbackStore } from '@/store/feedbackStore';
import { Feedback } from '@/types/feedback';

type StatusColumn = 'Planned' | 'In-Progress' | 'Live';

const COLUMN_META: Record<
  StatusColumn,
  { title: string; description: string }
> = {
  Planned: {
    title: 'Planned',
    description: 'Ideas prioritized for research',
  },
  'In-Progress': {
    title: 'In-Progress',
    description: 'Currently being developed',
  },
  Live: {
    title: 'Live',
    description: 'Released features',
  },
};

const RoadmapPage = () => {
  const feedbacks = useFeedbackStore((state) => state.feedbacks);
  const updateStatus = useFeedbackStore((state) => state.updateFeedbackStatus);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const columns: StatusColumn[] = ['Planned', 'In-Progress', 'Live'];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overColumn = over.id as StatusColumn;

    const feedback = feedbacks.find((f) => f.id.toString() === activeId);
    if (feedback && feedback.status !== overColumn) {
      updateStatus(feedback.id, overColumn);
    }
  };

  const renderColumn = (status: StatusColumn) => {
    const columnData = feedbacks
      .filter((f) => f.status === status)
      .sort((a, b) => b.upvotes - a.upvotes);

    return (
      <div key={status}>
        <div className='flex items-center gap-2 mb-1'>
          <span
            className={`w-2 h-2 rounded-full ${
              status === 'Planned'
                ? 'bg-[var(--status-planned)]'
                : status === 'In-Progress'
                  ? 'bg-[var(--status-inprogress)]'
                  : 'bg-[var(--status-live)]'
            }`}
          />
          <h2 className='text-md font-semibold text-[var(--text-primary)]'>
            {COLUMN_META[status].title} ({columnData.length})
          </h2>
        </div>
        <p className='text-sm text-[var(--text-muted)] mb-4'>
          {COLUMN_META[status].description}
        </p>

        <SortableContext
          items={columnData.map((item) => item.id.toString())}
          strategy={verticalListSortingStrategy}
        >
          <div className='min-h-[20px] space-y-6'>
            {columnData.map((item) => (
              <DraggableCard key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>
      </div>
    );
  };

  return (
    <main className='px-4 py-6 sm:px-8 lg:px-16 bg-[var(--bg-page)] min-h-screen'>
      <div className='flex items-center justify-between mb-6'>
        <Link
          href='/'
          className='text-sm font-bold text-[var(--text-primary)] hover:underline'
        >
          ← Go Back
        </Link>
        <h1 className='text-xl font-bold text-[var(--text-primary)]'>
          Roadmap
        </h1>
        <Link
          href='/feedback/new'
          className='bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-white px-4 py-2 rounded-md transition'
        >
          + Add Feedback
        </Link>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className='grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10'>
          {columns.map(renderColumn)}
        </div>
      </DndContext>
    </main>
  );
};

export default RoadmapPage;

const DraggableCard = ({ item }: { item: Feedback }) => {
  const toggleUpvote = useFeedbackStore((state) => state.toggleUpvote);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Link href={`/feedback/${item.id}`}>
        <div
          className={`bg-[var(--bg-card)] p-7 rounded-lg border-t-4 shadow-md hover:ring-2 ring-[var(--btn-primary)] transition-transform hover:-translate-y-1 ${
            item.status === 'Planned'
              ? 'border-[var(--status-planned)]'
              : item.status === 'In-Progress'
                ? 'border-[var(--status-inprogress)]'
                : 'border-[var(--status-live)]'
          }`}
        >
          <p className='text-sm text-[var(--text-muted)] capitalize mb-2'>
            {item.status}
          </p>
          <h3 className='text-md font-bold text-[var(--text-primary)]'>
            {item.title}
          </h3>
          <p className='text-sm text-[var(--text-muted)] mb-4'>
            {item.description}
          </p>
          <span className='inline-block bg-[var(--badge-bg)] text-[var(--text-primary)] text-xs font-semibold px-3 py-1 rounded-md mb-4'>
            {item.category}
          </span>

          <div className='flex justify-between items-center'>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleUpvote(item.id);
              }}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg transition font-semibold text-sm ${
                item.upvoted
                  ? 'bg-[var(--btn-primary)] text-white'
                  : 'bg-[var(--badge-bg)] text-[var(--text-primary)]'
              }`}
            >
              <Image
                src='/assets/icons/icon-arrow-up.svg'
                alt='Upvote'
                width={10}
                height={10}
              />
              {item.upvotes}
            </button>

            <div className='flex items-center gap-1'>
              <Image
                src='/assets/icons/icon-comments.svg'
                alt='Comments'
                width={16}
                height={16}
              />
              <span className='text-sm font-semibold text-[var(--text-primary)]'>
                {item.comments?.length ?? 0}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
