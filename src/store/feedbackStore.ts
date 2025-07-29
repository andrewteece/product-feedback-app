import { create } from 'zustand';
import type { Feedback, Category, SortOption, Status } from '@/types/feedback';

interface FeedbackState {
  feedback: Feedback[];
  sortOption: SortOption;
  selectedCategory: Category | 'all';

  setSelectedCategory: (category: Category | 'all') => void;
  setFeedback: (newFeedback: Feedback[]) => void;

  setSort: (option: SortOption) => void;

  toggleUpvote: (id: number) => void;
  addComment: (feedbackId: number, content: string) => void;
  addReply: (feedbackId: number, commentId: number, content: string) => void;
  updateStatus: (id: number, newStatus: Status) => void;
}

const CURRENT_USER = {
  avatarUrl: '/assets/user-images/image-suzanne.jpg',
  name: 'Suzanne Chang',
  username: 'upbeat1811',
};

export const useFeedbackStore = create<FeedbackState>((set) => ({
  feedback: [],
  sortOption: 'most-upvotes',
  selectedCategory: 'all',

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setFeedback: (newFeedback) => set({ feedback: newFeedback }),
  setSort: (option) => set({ sortOption: option }),

  toggleUpvote: (id) =>
    set((state) => {
      console.log('[Zustand] toggleUpvote for ID:', id);
      const updated = state.feedback.map((f) =>
        f.id === id
          ? {
              ...f,
              upvotes: f.upvoted ? f.upvotes - 1 : f.upvotes + 1,
              upvoted: !f.upvoted,
            }
          : f
      );
      return { feedback: updated };
    }),

  addComment: (feedbackId, content) =>
    set((state) => ({
      feedback: state.feedback.map((f) =>
        f.id === feedbackId
          ? {
              ...f,
              comments: [
                ...(f.comments ?? []),
                {
                  id: Date.now(),
                  content,
                  user: CURRENT_USER,
                  replies: [],
                },
              ],
            }
          : f
      ),
    })),

  addReply: (feedbackId, commentId, content) =>
    set((state) => ({
      feedback: state.feedback.map((f) => {
        if (f.id !== feedbackId) return f;

        const updatedComments = f.comments?.map((c) => {
          if (c.id !== commentId) return c;

          return {
            ...c,
            replies: [
              ...(c.replies ?? []),
              {
                id: Date.now(),
                content,
                replyingTo: c.user.username,
                user: CURRENT_USER,
              },
            ],
          };
        });

        return {
          ...f,
          comments: updatedComments ?? [],
        };
      }),
    })),

  updateStatus: (id, newStatus) =>
    set((state) => ({
      feedback: state.feedback.map((f) =>
        f.id === id ? { ...f, status: newStatus } : f
      ),
    })),
}));
