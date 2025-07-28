// Status types and constants
export type Status = 'suggestion' | 'planned' | 'in-progress' | 'live';

export type Category = 'feature' | 'ui' | 'ux' | 'enhancement' | 'bug';

export interface User {
  name: string;
  username: string;
  avatarUrl: string;
}

export interface Reply {
  content: string;
  replyingTo: string;
  user: User;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  replies?: Reply[];
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

export const STATUS_VALUES: Status[] = [
  'suggestion',
  'planned',
  'in-progress',
  'live',
];

export const STATUS_LABELS: Record<Status, string> = {
  suggestion: 'Suggestion',
  planned: 'Planned',
  'in-progress': 'In Progress',
  live: 'Live',
};

export const STATUS_COLORS: Record<Status, string> = {
  suggestion: 'violet',
  planned: 'pink',
  'in-progress': 'orange',
  live: 'teal',
};

export const DEFAULT_STATUS: Status = 'suggestion';

export const CATEGORY_VALUES: Category[] = [
  'feature',
  'ui',
  'ux',
  'enhancement',
  'bug',
];

export const CATEGORY_LABELS: Record<Category, string> = {
  feature: 'Feature',
  ui: 'UI',
  ux: 'UX',
  enhancement: 'Enhancement',
  bug: 'Bug',
};

export const DEFAULT_CATEGORY: Category = 'feature';

// Sorting options
export type SortOption =
  | 'most-upvotes'
  | 'least-upvotes'
  | 'most-comments'
  | 'least-comments';

export const SORT_OPTIONS: SortOption[] = [
  'most-upvotes',
  'least-upvotes',
  'most-comments',
  'least-comments',
];
