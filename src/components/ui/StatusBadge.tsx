import { Status } from '@/types/feedback';
import { statusMetaMap } from '@/lib/statusMeta';

type Props = {
  status: Status;
};

export default function StatusBadge({ status }: Props) {
  const { label, dotClass, textClass } = statusMetaMap[status];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold  ${textClass}`}
    >
      <span className={`h-2 w-2 rounded-full ${dotClass}`} />
      {label}
    </span>
  );
}
