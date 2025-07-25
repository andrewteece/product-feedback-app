export type Category = 'UI' | 'UX' | 'Enhancement' | 'Bug' | 'Feature';

export enum Status {
  Suggestion = 'Suggestion',
  Planned = 'Planned',
  InProgress = 'In-Progress',
  Live = 'Live',
}

export interface CommentReply {
  content: string;
  replyingTo: string;
  user: {
    name: string;
    username: string;
    avatarUrl: string;
  };
}

export interface Comment {
  id: number;
  content: string;
  user: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  replies?: CommentReply[];
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
