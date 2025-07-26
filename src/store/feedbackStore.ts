import { create } from 'zustand';
import type {
  Feedback,
  FilterableCategory,
  SortOption,
} from '@/types/feedback';

interface FeedbackState {
  feedback: Feedback[];
  setFeedback: (feedback: Feedback[]) => void;

  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;

  category: FilterableCategory;
  setCategory: (category: FilterableCategory) => void;

  toggleUpvote: (feedbackId: number) => void;
  addComment: (feedbackId: number, content: string) => void;
  addReply: (feedbackId: number, commentId: number, content: string) => void;
}

export const useFeedbackStore = create<FeedbackState>((set, get) => ({
  feedback: [],
  setFeedback: (newFeedback) => set({ feedback: newFeedback }),

  sortOption: 'most-upvotes',
  setSortOption: (option) => set({ sortOption: option }),

  category: 'all',
  setCategory: (category) => set({ category }),

  toggleUpvote: (feedbackId) => {
    const updated = get().feedback.map((item) =>
      item.id === feedbackId
        ? {
            ...item,
            upvoted: !item.upvoted,
            upvotes: item.upvoted ? item.upvotes - 1 : item.upvotes + 1,
          }
        : item
    );
    set({ feedback: updated });
  },

  addComment: (feedbackId, content) => {
    const updated = get().feedback.map((item) =>
      item.id === feedbackId
        ? {
            ...item,
            comments: [
              ...(item.comments ?? []),
              {
                id: Date.now(),
                content,
                user: {
                  image: '/assets/user-images/image-zena.jpg',
                  name: 'Zena Kelley',
                  username: 'velvetround',
                },
              },
            ],
          }
        : item
    );
    set({ feedback: updated });
  },

  addReply: (feedbackId, commentId, content) => {
    const updated = get().feedback.map((item) => {
      if (item.id !== feedbackId) return item;

      const updatedComments = (item.comments ?? []).map((comment) => {
        if (comment.id !== commentId) return comment;

        const replies = comment.replies ?? [];

        return {
          ...comment,
          replies: [
            ...replies,
            {
              id: Date.now(),
              content,
              user: {
                image: '/assets/user-images/image-zena.jpg',
                name: 'Zena Kelley',
                username: 'velvetround',
              },
            },
          ],
        };
      });

      return { ...item, comments: updatedComments };
    });

    set({ feedback: updated });
  },
}));
