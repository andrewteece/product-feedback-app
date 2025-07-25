import { create } from 'zustand';
import type { Feedback, Status } from '@/types/feedback';

export type FeedbackState = {
  feedbacks: Feedback[];
  setFeedbacks: (data: Feedback[]) => void;
  toggleUpvote: (id: number) => void;
  updateFeedbackStatus: (id: number, newStatus: Status) => void;
};

export const useFeedbackStore = create<FeedbackState>((set) => ({
  feedbacks: [],

  setFeedbacks: (data: Feedback[]) =>
    set({
      feedbacks: data.map((item) => ({
        ...item,
        upvoted: item.upvoted ?? false,
      })),
    }),

  toggleUpvote: (id: number) =>
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

  updateFeedbackStatus: (id: number, newStatus: Status) =>
    set((state) => ({
      feedbacks: state.feedbacks.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      ),
    })),
}));
