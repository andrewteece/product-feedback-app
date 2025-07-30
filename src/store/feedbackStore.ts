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
  getVisibleFeedback: () => Feedback[]; // ✅ new derived state
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

    // Optimistic UI update
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

    const result = await toggleUpvoteMock(id, current.upvoted);

    if (!result.success) {
      // Optional rollback
      set((state) => ({
        feedback: state.feedback.map((item) =>
          item.id === id ? current : item
        ),
      }));
    }
  },

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSortOption: (option) => set({ sortOption: option }),

  getVisibleFeedback: () => {
    const { feedback, selectedCategory, sortOption } = get();

    let filtered =
      selectedCategory === 'all'
        ? feedback
        : feedback.filter((f) => f.category === selectedCategory);

    switch (sortOption) {
      case 'most-upvotes':
        filtered = [...filtered].sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'least-upvotes':
        filtered = [...filtered].sort((a, b) => a.upvotes - b.upvotes);
        break;
      case 'most-comments':
        filtered = [...filtered].sort(
          (a, b) => (b.comments?.length ?? 0) - (a.comments?.length ?? 0)
        );
        break;
      case 'least-comments':
        filtered = [...filtered].sort(
          (a, b) => (a.comments?.length ?? 0) - (b.comments?.length ?? 0)
        );
        break;
    }

    return filtered;
  },
}));
