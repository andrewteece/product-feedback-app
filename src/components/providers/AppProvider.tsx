'use client';

import { ReactNode, useEffect } from 'react';
import { useFeedbackStore } from '@/store/feedbackStore';
import data from '@/lib/data/data.json';
import { FeedbackDataSchema } from '@/lib/feedbackSchema';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { Category, Status } from '@/types/feedback';

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

    const parsed = FeedbackDataSchema.parse(data);

    const normalized = parsed.productRequests.map((f) => ({
      ...f,
      upvoted: false,
      category: f.category as Category,
      status: f.status as Status,
      comments:
        f.comments?.map((c) => ({
          ...c,
          user: {
            ...c.user,
            image: c.user.avatarUrl, // ✅ fix for comment user
          },
          replies:
            c.replies?.map((r) => ({
              ...r,
              user: {
                ...r.user,
                image: r.user.avatarUrl, // ✅ fix for reply user
              },
            })) ?? [],
        })) ?? [],
    }));

    setFeedback(normalized);
  }, [setFeedback]);

  return (
    <NextThemesProvider attribute='class' defaultTheme='system' enableSystem>
      {children}
    </NextThemesProvider>
  );
}
