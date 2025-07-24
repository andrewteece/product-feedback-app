import FeedbackForm from '@/components/feedback/FeedbackForm';

export default function NewFeedbackPage() {
  return (
    <section className='max-w-xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Create New Feedback</h1>
      <FeedbackForm />
    </section>
  );
}
