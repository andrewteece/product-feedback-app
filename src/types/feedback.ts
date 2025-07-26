export type Category = 'ui' | 'ux' | 'enhancement' | 'bug' | 'feature';
export type Status = 'suggestion' | 'planned' | 'in-progress' | 'live';
export type FilterableCategory = Category | 'all';

export type SortOption =
  | 'most-upvotes'
  | 'least-upvotes'
  | 'most-comments'
  | 'least-comments';

export const SORT_LABELS: Record<SortOption, string> = {
  'most-upvotes': 'Most Upvotes',
  'least-upvotes': 'Least Upvotes',
  'most-comments': 'Most Comments',
  'least-comments': 'Least Comments',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  feature: 'Feature',
  ui: 'UI',
  ux: 'UX',
  enhancement: 'Enhancement',
  bug: 'Bug',
};

export interface Comment {
  id: number;
  content: string;
  user: {
    name: string;
    username: string;
    image: string;
  };
  replies?: Comment[];
}

export interface Feedback {
  id: number;
  title: string;
  description: string;
  category: Category;
  status: Status;
  upvotes: number;
  upvoted: boolean;
  comments?: Comment[];
}

export const STATUS_LABELS: Record<Status, string> = {
  suggestion: 'Suggestion',
  planned: 'Planned',
  'in-progress': 'In-Progress',
  live: 'Live',
};

export const DEFAULT_STATUS: Status = 'suggestion';

export const STATUS_DESCRIPTIONS: Record<Status, string> = {
  suggestion: 'Ideas awaiting feedback',
  planned: 'Ideas prioritized for research',
  'in-progress': 'Currently being developed',
  live: 'Released features',
};

export const STATUS_COLORS: Record<Status, string> = {
  suggestion: 'gray',
  planned: 'var(--status-planned)',
  'in-progress': 'var(--status-inprogress)',
  live: 'var(--status-live)',
};

export const STATUS_VALUES: Status[] = [
  'suggestion',
  'planned',
  'in-progress',
  'live',
];
