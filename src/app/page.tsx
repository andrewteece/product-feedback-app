'use client';

import Link from 'next/link';
import { useFeedbackStore } from '@/store/feedbackStore';
import SuggestionList from '@/components/feedback/SuggestionList';
import CategoryFilter from '@/components/filters/CategoryFilter';
import SortDropdown from '@/components/feedback/SortDropdown';
import { useFeedbackInitializer } from '@/lib/userFeedbackInitializer';
import { routes } from '@/lib/routes';

export default function Home() {
  useFeedbackInitializer();

  const feedback = useFeedbackStore((s) => s.feedback);
  const toggleUpvote = useFeedbackStore((s) => s.toggleUpvote);
  const sort = useFeedbackStore((s) => s.sortOption);
  const suggestionsOnly = feedback.filter((f) => f.status === 'suggestion');

  return (
    <main className='bg-[var(--bg-page)] min-h-screen text-[var(--text-primary)] px-4 py-6 sm:px-8 lg:px-16'>
      <div className='grid lg:grid-cols-[250px_1fr] gap-6 max-w-[1100px] mx-auto'>
        {/* Sidebar */}
        <aside className='space-y-6'>
          <CategoryFilter />
          <div className='bg-[var(--bg-card)] p-6 rounded-lg shadow-sm'>
            <h2 className='text-md font-bold text-[var(--text-primary)] mb-4'>
              Roadmap
            </h2>
            <div className='space-y-2 text-sm text-[var(--text-muted)]'>
              {['planned', 'in-progress', 'live'].map((status) => (
                <div key={status} className='flex justify-between'>
                  <span
                    className={`before:inline-block before:w-2 before:h-2 before:rounded-full before:mr-2 before:bg-[var(--status-${status})]`}
                  >
                    {status
                      .replace('-', ' ')
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                  <span>
                    {feedback.filter((f) => f.status === status).length}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href={routes.roadmap}
              className='inline-block mt-6 text-sm font-semibold text-[var(--btn-primary)] hover:underline'
            >
              View
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <section className='space-y-6'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[var(--bg-card)] px-6 py-4 rounded-lg shadow-sm'>
            <div className='flex items-center justify-between sm:justify-start sm:gap-8 w-full sm:w-auto'>
              <h1 className='text-lg font-bold text-[var(--text-primary)]'>
                {suggestionsOnly.length} Suggestions
              </h1>
              <div className='flex items-center gap-2 text-sm text-[var(--text-muted)]'>
                <SortDropdown />
              </div>
            </div>

            <Link
              href={routes.newFeedback}
              className='mt-4 sm:mt-0 inline-block bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-white text-sm font-semibold py-2 px-4 rounded-lg transition'
            >
              + Add Feedback
            </Link>
          </div>

          <SuggestionList
            feedback={suggestionsOnly}
            category={useFeedbackStore((s) => s.selectedCategory)}
            sort={sort}
            onUpvote={toggleUpvote}
          />
        </section>
      </div>
    </main>
  );
}
