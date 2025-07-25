'use client';

import { useEffect } from 'react';
import { useFeedbackStore } from '@/store/feedbackStore';
import type { Feedback, Status, Category, Comment } from '@/types/feedback';
import data from '@/lib/data/data.json';

interface RawUser {
  name: string;
  username: string;
  image: string;
}

interface RawReply {
  content: string;
  replyingTo: string;
  user: RawUser;
}

interface RawComment {
  id: number;
  content: string;
  user: RawUser;
  replies?: RawReply[];
}

interface RawFeedback {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: RawComment[];
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const setFeedbacks = useFeedbackStore((state) => state.setFeedbacks);

  useEffect(() => {
    const normalized: Feedback[] = data.productRequests.map(
      (fb: RawFeedback) => ({
        id: fb.id,
        title: fb.title,
        description: fb.description,
        category: (fb.category.charAt(0).toUpperCase() +
          fb.category.slice(1).toLowerCase()) as Category,
        status:
          fb.status === 'in-progress'
            ? 'In-Progress'
            : ((fb.status.charAt(0).toUpperCase() +
                fb.status.slice(1).toLowerCase()) as Status),
        upvotes: fb.upvotes,
        upvoted: false,
        comments: fb.comments?.map(
          (comment): Comment => ({
            id: comment.id,
            content: comment.content,
            user: {
              name: comment.user.name,
              username: comment.user.username,
              avatarUrl: comment.user.image,
            },
            replies: comment.replies?.map((reply) => ({
              content: reply.content,
              replyingTo: reply.replyingTo,
              user: {
                name: reply.user.name,
                username: reply.user.username,
                avatarUrl: reply.user.image,
              },
            })),
          })
        ),
      })
    );

    setFeedbacks(normalized);
  }, [setFeedbacks]);

  return <>{children}</>;
}
