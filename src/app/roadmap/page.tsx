'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFeedbackStore } from '@/store/feedbackStore';

const RoadmapPage = () => {
  const feedbacks = useFeedbackStore((state) => state.feedbacks);
  const toggleUpvote = useFeedbackStore((state) => state.toggleUpvote);

  const planned = feedbacks
    .filter((f) => f.status === 'Planned')
    .sort((a, b) => b.upvotes - a.upvotes);
  const inProgress = feedbacks
    .filter((f) => f.status === 'In-Progress')
    .sort((a, b) => b.upvotes - a.upvotes);
  const live = feedbacks
    .filter((f) => f.status === 'Live')
    .sort((a, b) => b.upvotes - a.upvotes);

  const renderColumn = (
    title: string,
    description: string,
    items: typeof feedbacks,
    accentColor: string
  ) => (
    <section>
      <div className={`flex items-center gap-2 mb-1`}>
        <span
          className={`w-2 h-2 rounded-full ${accentColor}`}
          aria-hidden='true'
        ></span>
        <h2 className='text-md font-semibold text-darkBlue'>
          {title} ({items.length})
        </h2>
      </div>
      <p className='text-sm text-gray-500 mb-4'>{description}</p>

      <div>
        {items.map((item) => (
          <div key={item.id} className='mb-6'>
            <Link href={`/feedback/${item.id}`}>
              <div
                className={`bg-white dark:bg-darkBlue p-7 rounded-lg border-t-4 shadow-md hover:ring-2 ring-purple transition-transform hover:-translate-y-1 ${
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
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleUpvote(item.id);
                    }}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg transition font-semibold text-sm ${
                      item.upvoted
                        ? 'bg-purple text-white'
                        : 'bg-lightGrey dark:bg-indigo-900 text-darkBlue dark:text-white'
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
                    <span className='text-sm font-semibold text-darkBlue dark:text-white'>
                      {item.comments?.length ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
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

      <div className='grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10'>
        {renderColumn(
          'Planned',
          'Ideas prioritized for research',
          planned,
          'bg-orange'
        )}
        {renderColumn(
          'In-Progress',
          'Currently being developed',
          inProgress,
          'bg-magenta'
        )}
        {renderColumn('Live', 'Released features', live, 'bg-lightBlue')}
      </div>
    </main>
  );
};

export default RoadmapPage;
