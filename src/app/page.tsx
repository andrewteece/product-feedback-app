import CategoryFilter from '@/components/CategoryFilter';
import SortDropdown from '@/components/SortDropdown';
import FeedbackList from '@/components/FeedbackList';

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
