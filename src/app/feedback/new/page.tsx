'use client';

import FeedbackForm from '@/components/feedback/FeedbackForm';

export default function NewFeedbackPage() {
  return (
    <section className='max-w-xl mx-auto px-4 py-8 text-[var(--text-primary)]'>
      <h1 className='text-2xl font-bold mb-4'>Create New Feedback</h1>
      <FeedbackForm />
    </section>
  );
}
