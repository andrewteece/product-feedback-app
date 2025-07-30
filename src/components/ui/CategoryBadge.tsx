type Props = {
  category: string;
};

export default function CategoryBadge({ category }: Props) {
  return (
    <span className='rounded-md bg-[var(--badge-bg)] px-3 py-1 text-xs font-medium capitalize text-[var(--text-muted)]'>
      {category}
    </span>
  );
}
