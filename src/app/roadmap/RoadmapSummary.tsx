import Link from 'next/link';
import { useFeedbackStore } from '@/store/feedbackStore';

export default function RoadmapSummary() {
  const feedback = useFeedbackStore((s) => s.feedback);
  const counts = {
    planned: feedback.filter((f) => f.status === 'planned').length,
    inProgress: feedback.filter((f) => f.status === 'in-progress').length,
    live: feedback.filter((f) => f.status === 'live').length,
  };

  return (
    <div className='bg-[var(--bg-card)] p-6 rounded-lg shadow-sm'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-md font-bold text-[var(--text-primary)]'>
          Roadmap
        </h2>
        <Link
          href='/roadmap'
          className='text-sm font-semibold text-[var(--btn-primary)] hover:underline'
        >
          View
        </Link>
      </div>
      <ul className='text-sm text-[var(--text-muted)] space-y-2'>
        {Object.entries(counts).map(([status, count]) => (
          <li key={status} className='flex justify-between'>
            <span
              className={`before:mr-2 before:inline-block before:w-2 before:h-2 before:rounded-full before:bg-[var(--status-${status})] capitalize`}
            >
              {status.replace('-', ' ')}
            </span>
            <span>{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
