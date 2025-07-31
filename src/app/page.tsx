'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import { useFeedbackInitializer } from '@/lib/userFeedbackInitializer';

import CategoryFilter from '@/components/filters/CategoryFilter';
import SidebarHeaderCard from '@/components/layout/SidebarHeaderCard';
import RoadmapSummary from '@/components/roadmap/RoadmapSummary';
import SuggestionsHeader from '@/components/feedback/SuggestionsHeader';
import SuggestionList from '@/components/feedback/SuggestionList';

export default function Home() {
  useFeedbackInitializer();

  const feedback = useFeedbackStore((s) => s.feedback);
  const toggleUpvote = useFeedbackStore((s) => s.toggleUpvote);
  const selectedCategory = useFeedbackStore((s) => s.selectedCategory);
  const sort = useFeedbackStore((s) => s.sortOption);

  const suggestions = feedback.filter((f) => f.status === 'suggestion');

  return (
    <main className='bg-[var(--bg-page)] min-h-screen text-[var(--text-primary)] px-4 py-6 sm:px-8 lg:px-16'>
      <div className='grid lg:grid-cols-[250px_1fr] gap-6 max-w-[1100px] mx-auto'>
        {/* Sidebar */}
        <aside className='space-y-6'>
          <SidebarHeaderCard />
          <CategoryFilter />
          <RoadmapSummary />
        </aside>

        {/* Main content */}
        <section className='space-y-6'>
          <SuggestionsHeader />
          <SuggestionList
            feedback={suggestions}
            category={selectedCategory}
            sort={sort}
            onUpvote={toggleUpvote}
          />
        </section>
      </div>
    </main>
  );
}
