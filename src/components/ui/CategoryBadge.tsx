type Props = {
  category: string;
};

export default function CategoryBadge({ category }: Props) {
  return (
    <span className='rounded-md bg-[var(--category-badge-bg)] px-3 py-1 text-xs font-medium capitalize text-[var(--category-badge-text)]'>
      {category}
    </span>
  );
}
