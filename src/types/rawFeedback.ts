export interface RawUser {
  image: string;
  name: string;
  username: string;
}

export interface RawReply {
  content: string;
  replyingTo: string;
  user: RawUser;
}

export interface RawComment {
  id: number;
  content: string;
  user: RawUser;
  replies?: RawReply[];
}

export interface RawFeedback {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  upvotes: number;
  comments?: RawComment[];
}
