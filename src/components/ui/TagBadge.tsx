type Props = {
  label: string;
};

export default function TagBadge({ label }: Props) {
  return (
    <span className='inline-block rounded-md bg-[var(--tag-bg)] px-3 py-1 text-xs font-medium text-[var(--tag-text)]'>
      {label}
    </span>
  );
}
