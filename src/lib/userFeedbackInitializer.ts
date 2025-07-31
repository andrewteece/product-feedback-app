'use client';

import { useEffect } from 'react';
import data from '@/lib/data/data.json';
import type { FeedbackData } from '@/types/feedback';
import { useFeedbackStore } from '@/store/feedbackStore';
import { useUserStore } from '@/store/userStore';

export function useFeedbackInitializer() {
  const feedback = useFeedbackStore((s) => s.feedback);
  const setFeedback = useFeedbackStore((s) => s.setFeedback);
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    if (feedback.length === 0) {
      const typed = data as FeedbackData;

      // Defensive check if data ever changes shape
      if (typed.productRequests && typed.currentUser) {
        setFeedback(typed.productRequests);
        setUser(typed.currentUser);
      }
    }
  }, [feedback.length, setFeedback, setUser]);
}
