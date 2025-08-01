'use client';

import { Lightbulb } from 'lucide-react';
import { useFeedbackStore } from '@/store/feedbackStore';
import SortDropdown from '@/components/feedback/SortDropdown';
import Link from 'next/link';
import { routes } from '@/lib/routes';
import { ThemeToggle } from '@/components/ui';

export default function SuggestionsHeader() {
  const feedback = useFeedbackStore((s) => s.feedback);
  const suggestions = feedback.filter((f) => f.status === 'suggestion');

  return (
    <header className='flex items-center justify-between bg-[var(--bg-header)] px-6 py-4 rounded-lg'>
      <div className='flex items-center gap-6'>
        <div className='flex items-center gap-4 text-white'>
          <Lightbulb className='h-5 w-5' />
          <h1 className='text-lg font-bold'>
            {suggestions.length} Suggestions
          </h1>
        </div>

        <div className='text-sm text-white'>
          Sort by : <SortDropdown />
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <ThemeToggle />
        <Link
          href={routes.newFeedback}
          className='rounded-lg bg-[var(--btn-primary)] px-4 py-2 text-sm font-bold text-white hover:bg-[var(--btn-primary-hover)] transition'
        >
          + Add Feedback
        </Link>
      </div>
    </header>
  );
}
