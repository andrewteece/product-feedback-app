import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Feedback, Status, Category } from '@/types/feedback';

type SortOption =
  | 'most-upvotes'
  | 'least-upvotes'
  | 'most-comments'
  | 'least-comments';

interface FeedbackState {
  feedback: Feedback[];
  selectedCategory: Category | 'All';
  setSelectedCategory: (category: Category | 'All') => void;
  setFeedback: (feedback: Feedback[]) => void;
  addFeedback: (feedback: Feedback) => void;
  updateFeedbackStatus: (id: number, newStatus: Status) => void;
  toggleUpvote: (id: number) => void;
  addComment: (feedbackId: number, content: string) => void;
  addReply: (feedbackId: number, commentId: number, content: string) => void;

  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

export const useFeedbackStore = create<FeedbackState>()(
  subscribeWithSelector((set) => ({
    feedback: [],

    selectedCategory: 'All',

    setSelectedCategory: (category) => set({ selectedCategory: category }),

    setFeedback: (newFeedback: Feedback[]) => set({ feedback: newFeedback }),

    sortOption: 'most-upvotes',
    setSortOption: (option) => set({ sortOption: option }),

    addFeedback: (feedback) =>
      set((state) => ({
        feedback: [...state.feedback, feedback],
      })),

    updateFeedbackStatus: (id, newStatus) =>
      set((state) => ({
        feedback: state.feedback.map((fb) =>
          fb.id === id ? { ...fb, status: newStatus } : fb
        ),
      })),

    toggleUpvote: (id) =>
      set((state) => ({
        feedback: state.feedback.map((fb) =>
          fb.id === id
            ? {
                ...fb,
                upvoted: !fb.upvoted,
                upvotes: fb.upvoted ? fb.upvotes - 1 : fb.upvotes + 1,
              }
            : fb
        ),
      })),

    addComment: (feedbackId, content) =>
      set((state) => ({
        feedback: state.feedback.map((fb) =>
          fb.id === feedbackId
            ? {
                ...fb,
                comments: [
                  ...(fb.comments ?? []),
                  {
                    id: Date.now(),
                    content,
                    user: {
                      name: 'Guest User',
                      username: 'guest',
                      image: '/assets/user-images/image-default.jpg',
                    },
                    replies: [],
                  },
                ],
              }
            : fb
        ),
      })),

    addReply: (feedbackId, commentId, content) =>
      set((state) => ({
        feedback: state.feedback.map((fb) => {
          if (fb.id !== feedbackId) return fb;
          return {
            ...fb,
            comments: fb.comments?.map((comment) =>
              comment.id === commentId
                ? {
                    ...comment,
                    replies: [
                      ...(comment.replies ?? []),
                      {
                        id: Date.now(),
                        content,
                        user: {
                          name: 'Guest User',
                          username: 'guest',
                          image: '/assets/user-images/image-default.jpg',
                        },
                      },
                    ],
                  }
                : comment
            ),
          };
        }),
      })),
  }))
);

//  Persist feedbacks to localStorage
useFeedbackStore.subscribe(
  (state) => state.feedback,
  (feedbacks) => {
    try {
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    } catch (err) {
      console.error('Failed to persist feedbacks to localStorage:', err);
    }
  },
  { fireImmediately: false }
);
