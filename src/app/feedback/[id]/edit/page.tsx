'use client';

import { useParams, useRouter } from 'next/navigation';
import { useFeedbackStore } from '@/store/feedbackStore';
import FeedbackForm from '@/components/feedback/FeedbackForm';

export default function EditFeedbackPage() {
  const params = useParams();
  const id = Number(params?.id);
  const router = useRouter();

  const feedback = useFeedbackStore((s) => s.feedback.find((f) => f.id === id));
  const deleteFeedback = useFeedbackStore((s) => s.deleteFeedback);

  if (!feedback) {
    return <p className='text-center text-red-500'>Feedback not found.</p>;
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      deleteFeedback(id);
      router.push('/');
    }
  };

  return (
    <section className='max-w-xl mx-auto px-4 py-8 text-[var(--text-primary)] space-y-6'>
      <h1 className='text-2xl font-bold'>Edit Feedback</h1>

      <FeedbackForm
        initialValues={feedback}
        onSubmitSuccess={() => router.push(`/feedback/${id}`)}
      />

      <button
        onClick={handleDelete}
        className='text-sm font-semibold text-red-600 hover:underline'
      >
        Delete Feedback
      </button>
    </section>
  );
}
