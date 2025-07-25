'use client';
import React from 'react';
import Link from 'next/link';
import { useFeedbackStore } from '@/store/feedbackStore';
import type { Status } from '@/types/feedback';
import Image from 'next/image';

const RoadmapPage = () => {
  const feedback = useFeedbackStore((state) => state.feedback);

  const planned = feedback
    .filter((f) => f.status === ('Planned' as Status))
    .sort((a, b) => b.upvotes - a.upvotes);
  const inProgress = feedback
    .filter((f) => f.status === ('In-Progress' as Status))
    .sort((a, b) => b.upvotes - a.upvotes);
  const live = feedback
    .filter((f) => f.status === ('Live' as Status))
    .sort((a, b) => b.upvotes - a.upvotes);

  const renderColumn = (
    title: string,
    description: string,
    items: typeof feedback
  ) => (
    <section>
      <h2 className='text-md font-semibold text-darkBlue mb-1'>
        {title} ({items.length})
      </h2>
      <p className='text-sm text-gray-500 mb-4'>{description}</p>

      <div className='space-y-4'>
        {items.map((item) => (
          <div
            key={item.id}
            className={`bg-white dark:bg-darkBlue p-6 rounded-lg border-t-4 shadow-sm ${
              item.status === 'Planned'
                ? 'border-orange'
                : item.status === 'In-Progress'
                  ? 'border-magenta'
                  : 'border-lightBlue'
            }`}
          >
            <p className='text-sm text-gray-500 capitalize mb-2'>
              {item.status}
            </p>
            <h3 className='text-md font-bold text-darkBlue dark:text-white'>
              {item.title}
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
              {item.description}
            </p>

            <span className='inline-block bg-lightGrey dark:bg-indigo-900 text-darkBlue dark:text-white text-xs font-semibold px-3 py-1 rounded-md mb-4'>
              {item.category}
            </span>

            <div className='flex justify-between items-center'>
              <button className='flex items-center gap-1 bg-lightGrey dark:bg-indigo-900 text-sm text-darkBlue dark:text-white font-semibold px-3 py-1 rounded-lg hover:bg-blue-100 transition'>
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
                <span className='text-sm font-semibold text-darkBlue dark:text-white'>
                  {item.comments?.length ?? 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <main className='px-4 py-6 sm:px-8 lg:px-16 bg-lightGrey min-h-screen'>
      <div className='flex items-center justify-between mb-6'>
        <Link href='/' className='text-sm font-bold text-blue hover:underline'>
          ← Go Back
        </Link>
        <h1 className='text-xl font-bold'>Roadmap</h1>
        <Link
          href='/feedback/new'
          className='bg-purple text-white px-4 py-2 rounded-md hover:bg-purple-dark transition'
        >
          + Add Feedback
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {renderColumn('Planned', 'Ideas prioritized for research', planned)}
        {renderColumn('In-Progress', 'Currently being developed', inProgress)}
        {renderColumn('Live', 'Released features', live)}
      </div>
    </main>
  );
};

export default RoadmapPage;
