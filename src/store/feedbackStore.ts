import { create } from 'zustand';
import type { Feedback, Category, Status } from '@/types/feedback';
import { loadInitialFeedback } from '@/lib/loadInitialFeedback';
import { toggleUpvoteMock } from '@/lib/api';

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
  toggleUpvote: (id: number) => Promise<void>;
  setSelectedCategory: (category: Category | 'all') => void;
  setSortOption: (option: FeedbackStore['sortOption']) => void;
}

export const useFeedbackStore = create<FeedbackStore>((set, get) => ({
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

  toggleUpvote: async (id) => {
    const current = get().feedback.find((f) => f.id === id);
    if (!current) return;

    // Optimistically update UI
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

    // Simulate API call
    const result = await toggleUpvoteMock(id, current.upvoted);

    if (!result.success) {
      // Optionally revert the optimistic update if API fails
      set((state) => ({
        feedback: state.feedback.map((item) =>
          item.id === id ? current : item
        ),
      }));
    }
  },

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setSortOption: (option) => set({ sortOption: option }),
}));
