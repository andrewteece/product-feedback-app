import SortDropdown from '@/components/feedback/SortDropdown';
import Link from 'next/link';
import { useFeedbackStore } from '@/store/feedbackStore';
import { routes } from '@/lib/routes';

export default function SuggestionsHeader() {
  const feedback = useFeedbackStore((s) => s.feedback);
  const suggestions = feedback.filter((f) => f.status === 'suggestion');

  return (
    <div className='bg-[var(--bg-header)] text-white px-6 py-4 rounded-lg shadow-md flex justify-between items-center'>
      <h1 className='text-lg font-bold'>{suggestions.length} Suggestions</h1>
      <div className='flex items-center gap-4'>
        <SortDropdown />
        <Link
          href={routes.newFeedback}
          className='bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-white text-sm font-semibold py-2 px-4 rounded-lg'
        >
          + Add Feedback
        </Link>
      </div>
    </div>
  );
}
