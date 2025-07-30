import type { Status } from '@/types/feedback';

type StatusMeta = {
  label: string;
  color: string; // design token (CSS var)
  bgClass: string; // Tailwind-compatible background class
  textClass: string; // Tailwind-compatible text class
  dotClass: string; // Tailwind-compatible bg-* for small dots
};

export const statusMetaMap: Record<Status, StatusMeta> = {
  suggestion: {
    label: 'Suggestion',
    color: 'var(--status-planned)',
    bgClass: 'bg-[var(--status-planned)]/10',
    textClass: 'text-[var(--text-primary)]',
    dotClass: 'bg-[var(--status-planned)]',
  },
  planned: {
    label: 'Planned',
    color: 'var(--status-planned)',
    bgClass: 'bg-[var(--status-planned)]/10',
    textClass: 'text-[var(--status-planned)]',
    dotClass: 'bg-[var(--status-planned)]',
  },
  'in-progress': {
    label: 'In Progress',
    color: 'var(--status-inprogress)',
    bgClass: 'bg-[var(--status-inprogress)]/10',
    textClass: 'text-[var(--status-inprogress)]',
    dotClass: 'bg-[var(--status-inprogress)]',
  },
  live: {
    label: 'Live',
    color: 'var(--status-live)',
    bgClass: 'bg-[var(--status-live)]/10',
    textClass: 'text-[var(--status-live)]',
    dotClass: 'bg-[var(--status-live)]',
  },
};
