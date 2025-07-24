// store/feedbackStore.ts
import { create } from 'zustand';
import type { Feedback, Category } from '@/types/feedback';

type SortOption =
  | 'Most Upvotes'
  | 'Least Upvotes'
  | 'Most Comments'
  | 'Least Comments';

interface FeedbackState {
  feedbacks: Feedback[];
  selectedCategory: Category | 'All';
  sortOption: SortOption;
  setFeedbacks: (feedbacks: Feedback[]) => void;
  addFeedback: (newFeedback: Feedback) => void;
  upvoteFeedback: (id: number) => void;
  setCategory: (category: Category | 'All') => void;
  setSortOption: (option: SortOption) => void;
}

export const useFeedbackStore = create<FeedbackState>((set) => ({
  feedbacks: [],
  selectedCategory: 'All',
  sortOption: 'Most Upvotes',

  setFeedbacks: (feedbacks) => set({ feedbacks }),
  addFeedback: (newFeedback) =>
    set((state) => ({ feedbacks: [...state.feedbacks, newFeedback] })),

  upvoteFeedback: (id) =>
    set((state) => ({
      feedbacks: state.feedbacks.map((f) =>
        f.id === id ? { ...f, upvotes: f.upvotes + 1 } : f
      ),
    })),

  setCategory: (category) => set({ selectedCategory: category }),
  setSortOption: (option) => set({ sortOption: option }),
}));
