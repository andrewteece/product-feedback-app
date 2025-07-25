'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Category } from '@/types/feedback';
import type { SortOption } from '@/components/feedback/SortDropdown';

export function useSuggestionsFilters() {
  const params = useSearchParams();
  const router = useRouter();

  const category = (params.get('category') as Category | 'all') ?? 'all';
  const sort = (params.get('sort') as SortOption) ?? 'Most Upvotes';

  const updateFilters = (next: {
    category?: Category | 'all';
    sort?: SortOption;
  }) => {
    const newParams = new URLSearchParams(params.toString());

    if (next.category) {
      newParams.set('category', next.category);
    }

    if (next.sort) {
      newParams.set('sort', next.sort);
    }

    router.replace(`/suggestions?${newParams.toString()}`);
  };

  return {
    category,
    sort,
    updateFilters,
  };
}
