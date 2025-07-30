// components/feedback/UpvoteButton.tsx
import { clsx } from 'clsx';

type Props = {
  count: number;
  upvoted: boolean;
  onClick: () => void;
};

export default function UpvoteButton({ count, upvoted, onClick }: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      aria-pressed={upvoted}
      aria-label={upvoted ? 'Remove upvote' : 'Upvote this feedback'}
      className={clsx(
        'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        upvoted
          ? 'bg-[var(--btn-primary)] text-white hover:bg-[var(--btn-primary-hover)]'
          : 'bg-[var(--btn-upvote)] text-[var(--btn-upvote-text)] hover:bg-[var(--btn-upvote-hover)]'
      )}
    >
      <svg
        className={clsx(
          'w-3 h-3',
          upvoted ? 'fill-white' : 'fill-[var(--btn-upvote-text)]'
        )}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 10 7'
      >
        <path d='M1 6l4-4 4 4' stroke='none' />
      </svg>
      <span>{count}</span>
    </button>
  );
}
