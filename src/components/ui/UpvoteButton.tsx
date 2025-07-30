type Props = {
  count: number;
  upvoted: boolean;
  onClick: () => void;
};

export default function UpvoteButton({ count, upvoted, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-pressed={upvoted}
      className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
        upvoted
          ? 'bg-[var(--btn-primary)] text-white hover:bg-[var(--btn-primary-hover)]'
          : 'bg-[var(--btn-upvote)] text-[var(--btn-upvote-text)] hover:bg-[var(--btn-upvote-hover)]'
      }`}
    >
      ▲<span>{count}</span>
    </button>
  );
}
