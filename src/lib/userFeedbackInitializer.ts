'use client';

import { useEffect } from 'react';
import { useFeedbackStore } from '@/store/feedbackStore';
import data from '@/lib/data/data.json';
import type { Feedback, Comment, Category, Status } from '@/types/feedback';

let globalId = 99999;

// Raw shape from data.json (before we type-sanitize it)
type RawComment = {
  id?: number;
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
  replies?: RawComment[];
};

const normalizeCategory = (raw: string): Category => {
  const lower = raw.toLowerCase();
  if (
    lower === 'ui' ||
    lower === 'ux' ||
    lower === 'bug' ||
    lower === 'feature' ||
    lower === 'enhancement'
  ) {
    return lower as Category;
  }
  return 'feature';
};

const normalizeStatus = (raw: string): Status => {
  const lower = raw.toLowerCase();
  if (
    lower === 'suggestion' ||
    lower === 'planned' ||
    lower === 'in-progress' ||
    lower === 'live'
  ) {
    return lower as Status;
  }
  return 'suggestion';
};

const normalizeReplies = (replies: RawComment[] = []): Comment[] =>
  replies.map((reply) => ({
    id: reply.id ?? globalId++,
    content: reply.content,
    user: reply.user,
    replies: [], // nested replies not supported in original dataset
  }));

const normalizeComments = (comments: RawComment[] = []): Comment[] =>
  comments.map((comment) => ({
    id: comment.id ?? globalId++,
    content: comment.content,
    user: comment.user,
    replies: normalizeReplies(comment.replies),
  }));

export function useFeedbackInitializer() {
  const feedbacks = useFeedbackStore((s) => s.feedback);
  const setFeedbacks = useFeedbackStore((s) => s.setFeedback);

  useEffect(() => {
    if (feedbacks.length === 0) {
      const normalized: Feedback[] = data.productRequests.map((item) => ({
        ...item,
        upvoted: false,
        category: normalizeCategory(item.category),
        status: normalizeStatus(item.status),
        comments: normalizeComments(item.comments),
      }));

      setFeedbacks(normalized);
    }
  }, [feedbacks, setFeedbacks]);
}
