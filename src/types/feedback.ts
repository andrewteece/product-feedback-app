export type Category = 'UI' | 'UX' | 'Enhancement' | 'Bug' | 'Feature';

export type Status = 'Suggestion' | 'Planned' | 'In-Progress' | 'Live';

export interface Comment {
  id: number;
  content: string;
  user: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  replies?: Comment[]; // nested replies (optional)
}

export interface Feedback {
  id: number;
  title: string;
  description: string;
  category: Category;
  status: Status;
  upvotes: number;
  upvoted?: boolean;
  comments?: Comment[];
}
