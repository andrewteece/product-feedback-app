// Status types and constants
export type Status = 'suggestion' | 'planned' | 'in-progress' | 'live';

export interface User {
  image: string;
  name: string;
  username: string;
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

// Category types and constants
export type Category = 'feature' | 'ui' | 'ux' | 'enhancement' | 'bug';

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

// Comment and Feedback types
export interface Comment {
  id: number;
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
  replyingTo?: string;
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

export interface Reply {
  id: number;
  content: string;
  replyingTo: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
}

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
