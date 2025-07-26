'use client';

import { useEffect } from 'react';
import data from '@/lib/data/data.json';
import { useFeedbackStore } from '@/store/feedbackStore';
import type { Feedback, Category, Status, Comment } from '@/types/feedback';

let commentIdCounter = 1000;

type RawReply = {
  content: string;
  replyingTo?: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
};

type RawComment = {
  id: number;
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
  replies?: RawReply[];
};

function normalizeComments(comments: RawComment[]): Comment[] {
  return comments.map((comment) => {
    const base: Comment = {
      id: comment.id,
      content: comment.content,
      user: comment.user,
    };

    if (comment.replies && Array.isArray(comment.replies)) {
      base.replies = comment.replies.map((reply) => ({
        id: commentIdCounter++,
        content: reply.content,
        user: reply.user,
      }));
    }

    return base;
  });
}

export function useFeedbackInitializer() {
  const setFeedback = useFeedbackStore((state) => state.setFeedback);

  useEffect(() => {
    const enriched: Feedback[] = data.productRequests.map((item) => ({
      ...item,
      upvoted: false,
      category: item.category.toLowerCase() as Category,
      status: item.status.toLowerCase() as Status,
      comments: item.comments ? normalizeComments(item.comments) : [],
    }));

    setFeedback(enriched);
  }, [setFeedback]);
}
