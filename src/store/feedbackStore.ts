import { create } from 'zustand';
import type { Feedback, Status } from '@/types/feedback';

interface FeedbackState {
  feedbacks: Feedback[];
  setFeedbacks: (feedbacks: Feedback[]) => void;
  addFeedback: (feedback: Feedback) => void;
  updateFeedbackStatus: (id: number, newStatus: Status) => void;
  toggleUpvote: (id: number) => void;
}

export const useFeedbackStore = create<FeedbackState>((set) => ({
  feedbacks: [],

  setFeedbacks: (feedbacks) => set({ feedbacks }),

  addFeedback: (feedback) =>
    set((state) => ({
      feedbacks: [...state.feedbacks, feedback],
    })),

  updateFeedbackStatus: (id, newStatus) =>
    set((state) => ({
      feedbacks: state.feedbacks.map((fb) =>
        fb.id === id ? { ...fb, status: newStatus } : fb
      ),
    })),

  toggleUpvote: (id) =>
    set((state) => ({
      feedbacks: state.feedbacks.map((fb) =>
        fb.id === id
          ? {
              ...fb,
              upvoted: !fb.upvoted,
              upvotes: fb.upvoted ? fb.upvotes - 1 : fb.upvotes + 1,
            }
          : fb
      ),
    })),
}));
