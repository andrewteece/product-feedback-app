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
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useSearchParams, useRouter } from 'next/navigation';

import { useFeedbackStore } from '@/store/feedbackStore';
import type { Feedback, Status } from '@/types/feedback';
import {
  STATUS_LABELS,
  STATUS_DESCRIPTIONS,
  STATUS_COLORS,
} from '@/types/feedback';

type StatusColumn = Extract<Status, 'planned' | 'in-progress' | 'live'>;

const columns: StatusColumn[] = ['planned', 'in-progress', 'live'];

export default function RoadmapPage() {
  const feedbacks = useFeedbackStore((state) => state.feedbacks);
  const updateStatus = useFeedbackStore((state) => state.updateFeedbackStatus);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const router = useRouter();
  const params = useSearchParams();

  const statusParam = (params.get('status') as StatusColumn) ?? 'planned';

  const handleStatusChange = (newStatus: StatusColumn) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set('status', newStatus);
    router.replace(`/roadmap?${newParams.toString()}`);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString() as StatusColumn;

    const feedback = feedbacks.find((f) => f.id.toString() === activeId);
    if (feedback && feedback.status !== overId) {
      updateStatus(feedback.id, overId);
    }
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

      {/* Tab buttons */}
      <div className='flex gap-4 mb-6 border-b border-[var(--border-card)]'>
        {columns.map((col) => (
          <button
            key={col}
            onClick={() => handleStatusChange(col)}
            className={`pb-2 text-sm font-semibold border-b-2 transition ${
              statusParam === col
                ? 'border-[var(--btn-primary)] text-[var(--text-primary)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            {STATUS_LABELS[col]} (
            {feedbacks.filter((f) => f.status === col).length})
          </button>
        ))}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <DroppableColumn status={statusParam} items={feedbacks} />
      </DndContext>
    </main>
  );
}

function DroppableColumn({
  status,
  items,
}: {
  status: StatusColumn;
  items: Feedback[];
}) {
  const { setNodeRef } = useDroppable({ id: status });

  const columnData = items
    .filter((item) => item.status === status)
    .sort((a, b) => b.upvotes - a.upvotes);

  return (
    <div ref={setNodeRef} id={status}>
      <div className='flex items-center gap-2 mb-1'>
        <span
          className='w-2 h-2 rounded-full'
          style={{ backgroundColor: STATUS_COLORS[status] }}
        />
        <h2 className='text-md font-semibold text-[var(--text-primary)]'>
          {STATUS_LABELS[status]} ({columnData.length})
        </h2>
      </div>
      <p className='text-sm text-[var(--text-muted)] mb-4'>
        {STATUS_DESCRIPTIONS[status]}
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
}

function DraggableCard({ item }: { item: Feedback }) {
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
          className={`bg-[var(--bg-card)] p-7 rounded-lg border-t-4 shadow-md hover:ring-2 ring-[var(--btn-primary)] transition-transform hover:-translate-y-1`}
          style={{ borderColor: STATUS_COLORS[item.status] }}
        >
          <p className='text-sm text-[var(--text-muted)] capitalize mb-2'>
            {STATUS_LABELS[item.status]}
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
}
