export type Category = 'ui' | 'ux' | 'enhancement' | 'bug' | 'feature';
export type FilterableCategory = Category | 'all';

export type Status = 'suggestion' | 'planned' | 'in-progress' | 'live';

export const DEFAULT_STATUS: Status = 'suggestion';

export type User = {
  name: string;
  username: string;
  image: string;
};

export type Reply = {
  content: string;
  replyingTo: string;
  user: User;
};

export type Comment = {
  id: number;
  content: string;
  user: User;
  replies?: Reply[];
};

export type Feedback = {
  id: number;
  title: string;
  category: Category;
  upvotes: number;
  status: Status;
  description: string;
  comments?: Comment[];
  upvoted?: boolean;
};

export type FeedbackData = {
  currentUser: User;
  productRequests: Feedback[];
};
