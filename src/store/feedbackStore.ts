import { create } from 'zustand';

// Types
export type Status = 'Suggestion' | 'Planned' | 'In-Progress' | 'Live';

export type Feedback = {
  id: number;
  title: string;
  description: string;
  category: string;
  status: Status;
  upvotes: number;
  upvoted?: boolean;
  comments?: {
    id: number;
    content: string;
    user: {
      image: string;
      name: string;
      username: string;
    };
    replies?: {
      content: string;
      replyingTo: string;
      user: {
        image: string;
        name: string;
        username: string;
      };
    }[];
  }[];
};

export type FeedbackState = {
  feedbacks: Feedback[];
  setFeedbacks: (data: Feedback[]) => void;
  toggleUpvote: (id: number) => void;
};

export const useFeedbackStore = create<FeedbackState>((set) => ({
  feedbacks: [],

  setFeedbacks: (data) =>
    set({
      feedbacks: data.map((item) => ({
        ...item,
        upvoted: item.upvoted ?? false,
      })),
    }),

  toggleUpvote: (id) =>
    set((state) => {
      const updated = state.feedbacks.map((item) =>
        item.id === id
          ? {
              ...item,
              upvotes: item.upvoted ? item.upvotes - 1 : item.upvotes + 1,
              upvoted: !item.upvoted,
            }
          : item
      );
      return { feedbacks: updated };
    }),
}));
