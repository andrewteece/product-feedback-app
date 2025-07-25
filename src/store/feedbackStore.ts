import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Feedback, Status } from '@/types/feedback';

interface FeedbackState {
  feedbacks: Feedback[];
  setFeedbacks: (feedbacks: Feedback[]) => void;
  addFeedback: (feedback: Feedback) => void;
  updateFeedbackStatus: (id: number, newStatus: Status) => void;
  toggleUpvote: (id: number) => void;
  addComment: (feedbackId: number, content: string) => void;
}

export const useFeedbackStore = create<FeedbackState>()(
  subscribeWithSelector((set) => ({
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

    addComment: (feedbackId, content) =>
      set((state) => ({
        feedbacks: state.feedbacks.map((fb) =>
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
    addReply: (feedbackId: number, commentId: number, content: string) =>
      set((state) => ({
        feedbacks: state.feedbacks.map((fb) => {
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

// ✅ Persist feedbacks to localStorage on every update
useFeedbackStore.subscribe(
  (state) => state.feedbacks,
  (feedbacks) => {
    try {
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    } catch (err) {
      console.error('Failed to persist feedbacks to localStorage:', err);
    }
  },
  { fireImmediately: false }
);
