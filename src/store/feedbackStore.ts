import { create } from 'zustand';
import type {
  Feedback,
  Category,
  Status,
  Comment,
  Reply,
} from '@/types/feedback';
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
  addFeedback: (feedback: Feedback) => void;
  updateFeedback: (feedback: Feedback) => void;
  deleteFeedback: (id: number) => void;
  updateStatus: (id: number, newStatus: Status) => void;
  toggleUpvote: (id: number) => Promise<void>;
  addComment: (feedbackId: number, comment: Comment) => void;
  addReply: (feedbackId: number, commentId: number, reply: Reply) => void;
  setSelectedCategory: (category: Category | 'all') => void;
  setSortOption: (option: FeedbackStore['sortOption']) => void;
  getVisibleFeedback: () => Feedback[];
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

  addFeedback: (newItem) => {
    set((state) => ({
      feedback: [...state.feedback, newItem],
    }));
  },

  updateFeedback: (updated) => {
    set((state) => ({
      feedback: state.feedback.map((item) =>
        item.id === updated.id ? updated : item
      ),
    }));
  },

  deleteFeedback: (id) => {
    set((state) => ({
      feedback: state.feedback.filter((item) => item.id !== id),
    }));
  },

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

    const result = await toggleUpvoteMock(id, current.upvoted ?? false);

    if (!result.success) {
      set((state) => ({
        feedback: state.feedback.map((item) =>
          item.id === id ? current : item
        ),
      }));
    }
  },

  addComment: (feedbackId, comment) => {
    set((state) => ({
      feedback: state.feedback.map((item) =>
        item.id === feedbackId
          ? {
              ...item,
              comments: [...(item.comments ?? []), comment],
            }
          : item
      ),
    }));
  },

  addReply: (feedbackId, commentId, reply) => {
    set((state) => ({
      feedback: state.feedback.map((item) => {
        if (item.id !== feedbackId) return item;

        const comments = item.comments ?? [];

        const updatedComments = comments.map((comment) => {
          if (comment.id !== commentId) return comment;
          return {
            ...comment,
            replies: [...(comment.replies ?? []), reply],
          };
        });

        return { ...item, comments: updatedComments };
      }),
    }));
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
