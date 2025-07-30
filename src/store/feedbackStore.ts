import { create } from 'zustand';
import type { Feedback, Category, Status } from '@/types/feedback';
import { loadInitialFeedback } from '@/lib/loadInitialFeedback';

interface FeedbackStore {
  feedback: Feedback[];
  sortOption:
    | 'most-upvotes'
    | 'least-upvotes'
    | 'most-comments'
    | 'least-comments';
  selectedCategory: Category | 'all';

  loadFeedback: () => void;
  setFeedback: (items: Feedback[]) => void;
  updateStatus: (id: number, newStatus: Status) => void;
  toggleUpvote: (id: number) => void;
  setSelectedCategory: (category: Category | 'all') => void;
  setSortOption: (option: FeedbackStore['sortOption']) => void;
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  feedback: [],
  sortOption: 'most-upvotes',
  selectedCategory: 'all',

  loadFeedback: () => {
    const items = loadInitialFeedback();
    set({ feedback: items });
  },

  setFeedback: (items) => set({ feedback: items }),

  updateStatus: (id, newStatus) => {
    set((state) => ({
      feedback: state.feedback.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      ),
    }));
  },

  toggleUpvote: (id) => {
    set((state) => ({
      feedback: state.feedback.map((item) =>
        item.id === id
          ? {
              ...item,
              upvoted: !item.upvoted,
              upvotes: item.upvoted ? item.upvotes - 1 : item.upvotes + 1,
            }
          : item
      ),
    }));
  },

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setSortOption: (option) => set({ sortOption: option }),
}));
