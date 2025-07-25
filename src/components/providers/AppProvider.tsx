'use client';

import { useEffect } from 'react';
import { useFeedbackStore } from '@/store/feedbackStore';
import rawData from '@/lib/data/data.json';
import type { Status } from '@/store/feedbackStore';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const setFeedbacks = useFeedbackStore((state) => state.setFeedbacks);

  useEffect(() => {
    console.log(
      'RAW STATUS VALUES:',
      rawData.productRequests.map((f) => f.status)
    );

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

    type RawUser = {
      image: string;
      name: string;
      username: string;
    };

    const normalizeUser = (user: RawUser) => ({
      name: user.name,
      username: user.username,
      image: user.image, // ✅ image → avatarUrl
    });

    const loaded = rawData.productRequests.map((item) => ({
      ...item,
      status: normalizeStatus(item.status),
      upvoted: false,
      comments: item.comments?.map((comment) => ({
        ...comment,
        user: normalizeUser(comment.user),
        replies: comment.replies?.map((reply) => ({
          ...reply,
          user: normalizeUser(reply.user),
        })),
      })),
    }));

    console.log(
      '✅ NORMALIZED STATUS VALUES:',
      loaded.map((f) => f.status)
    );
    setFeedbacks(loaded);
  }, [setFeedbacks]);

  return <>{children}</>; // ✅ Don't forget to return children!
};
