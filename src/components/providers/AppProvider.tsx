'use client';

import { useEffect } from 'react';
import { useFeedbackStore } from '@/store/feedbackStore';
import rawData from '@/lib/data/data.json';
import type { Status, Category, Feedback } from '@/types/feedback';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const setFeedbacks = useFeedbackStore((state) => state.setFeedbacks);

  useEffect(() => {
    type RawUser = {
      image: string;
      name: string;
      username: string;
    };

    type RawFeedback = {
      id: number;
      title: string;
      description: string;
      category: string;
      status: string;
      upvotes: number;
      comments?: {
        id: number;
        content: string;
        user: RawUser;
        replies?: {
          content: string;
          replyingTo: string;
          user: RawUser;
        }[];
      }[];
    };

    const normalizeStatus = (status: string): Status => {
      const normalized = status.trim().toLowerCase();
      switch (normalized) {
        case 'suggestion':
          return 'Suggestion';
        case 'planned':
          return 'Planned';
        case 'in-progress':
          return 'In-Progress';
        case 'live':
          return 'Live';
        default:
          console.error('❌ Unknown status:', status);
          throw new Error(`Invalid status in data.json: "${status}"`);
      }
    };

    const normalizeUser = (user: RawUser) => ({
      name: user.name,
      username: user.username,
      image: user.image,
    });

    const loaded: Feedback[] = (rawData.productRequests as RawFeedback[]).map(
      (item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category as Category,
        status: normalizeStatus(item.status),
        upvotes: item.upvotes,
        upvoted: false,
        comments: item.comments?.map((comment) => ({
          id: comment.id,
          content: comment.content,
          user: normalizeUser(comment.user),
          replies: comment.replies?.map((reply) => ({
            content: reply.content,
            replyingTo: reply.replyingTo,
            user: normalizeUser(reply.user),
          })),
        })),
      })
    );

    setFeedbacks(loaded);
  }, [setFeedbacks]);

  return <>{children}</>;
};
