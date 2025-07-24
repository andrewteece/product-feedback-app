import CategoryFilter from '@/components/filters/CategoryFilter';
import SortDropdown from '@/components/feedback/SortDropdown';
import FeedbackList from '@/components/feedback/FeedbackList';

export default function Home() {
  return (
    <div>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <CategoryFilter />
        <SortDropdown />
      </div>
      <FeedbackList />
    </div>
  );
}
