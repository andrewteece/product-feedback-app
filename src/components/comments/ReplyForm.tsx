'use client';

import { useState } from 'react';

interface ReplyFormProps {
  onSubmit: (content: string) => void;
  onCancel?: () => void;
}

export default function ReplyForm({ onSubmit, onCancel }: ReplyFormProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 3) {
      setError('Reply must be at least 3 characters.');
      return;
    }
    onSubmit(text.trim());
    setText('');
    setError('');
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className='mt-4 space-y-2'>
      <textarea
        rows={3}
        className='w-full rounded border border-[var(--border-card)] px-3 py-2 bg-[var(--bg-card)] text-[var(--text-primary)]'
        placeholder='Write your reply...'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {error && <p className='text-sm text-red-500'>{error}</p>}
      <div className='flex gap-2'>
        <button
          type='submit'
          className='bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-white px-4 py-1 rounded-md text-sm transition'
        >
          Reply
        </button>
        {onCancel && (
          <button
            type='button'
            onClick={onCancel}
            className='text-sm text-[var(--text-muted)] hover:underline'
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
