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
      className={`flex flex-col items-center justify-center rounded-md px-2 py-1 text-sm font-semibold transition-colors ${
        upvoted
          ? 'bg-[var(--btn-primary)] text-white'
          : 'bg-[var(--badge-bg)] text-[var(--text-muted)]'
      }`}
    >
      ▲<span>{count}</span>
    </button>
  );
}
