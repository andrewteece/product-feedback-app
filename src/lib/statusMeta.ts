import type { Status } from '@/types/feedback';

type StatusMeta = {
  label: string;
  description: string;
  color: string;
  textClass: string;
  dotClass: string;
};

export const statusMetaMap: Record<Status, StatusMeta> = {
  suggestion: {
    label: 'Suggestion',
    description: '',
    color: '#F49F85',
    textClass: 'text-[#F49F85]',
    dotClass: 'bg-[#F49F85]',
  },
  planned: {
    label: 'Planned',
    description: 'Ideas prioritized for research',
    color: '#F49F85',
    textClass: 'text-[#F49F85]',
    dotClass: 'bg-[#F49F85]',
  },
  'in-progress': {
    label: 'In Progress',
    description: 'Currently being developed',
    color: '#AD1FEA',
    textClass: 'text-[#AD1FEA]',
    dotClass: 'bg-[#AD1FEA]',
  },
  live: {
    label: 'Live',
    description: 'Released features',
    color: '#62BCFA',
    textClass: 'text-[#62BCFA]',
    dotClass: 'bg-[#62BCFA]',
  },
};
