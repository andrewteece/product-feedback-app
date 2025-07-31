export type Category = 'ui' | 'ux' | 'enhancement' | 'bug' | 'feature';
export type FilterableCategory = Category | 'all';

export type Status = 'suggestion' | 'planned' | 'in-progress' | 'live';

export type User = {
  name: string;
  username: string;
  image: string; // ✅ Matches structure from data.json
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
};

export type FeedbackData = {
  currentUser: User;
  productRequests: Feedback[];
};
