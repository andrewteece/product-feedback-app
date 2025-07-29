'use client';

import { ReactNode, useEffect } from 'react';
import { useFeedbackStore } from '@/store/feedbackStore';
import data from '@/lib/data/data.json';
import type { Category, Status } from '@/types/feedback';
import { FeedbackDataSchema } from '@/lib/feedbackSchema';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  const setFeedback = useFeedbackStore((s) => s.setFeedback);

  useEffect(() => {
    const stored = localStorage.getItem('feedback');

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFeedback(parsed);
        return;
      } catch (err) {
        console.error('Failed to parse feedback from localStorage:', err);
      }
    }

    // ✅ Use Zod to validate and normalize the mock data
    const parsed = FeedbackDataSchema.parse(data);

    // ✅ Add `upvoted: false` to each feedback item
    const normalized = parsed.productRequests.map((f) => ({
      ...f,
      upvoted: false,
      category: f.category as Category,
      status: f.status as Status,
    }));

    setFeedback(normalized);
  }, [setFeedback]);

  return (
    <>
      <NextThemesProvider attribute='class' defaultTheme='system' enableSystem>
        {children}
      </NextThemesProvider>
    </>
  );
}
