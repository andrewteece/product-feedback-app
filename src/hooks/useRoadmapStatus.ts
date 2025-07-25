'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import type { Status } from '@/types/feedback';

type RoadmapStatus = Extract<Status, 'planned' | 'in-progress' | 'live'>;

export function useRoadmapStatus() {
  const router = useRouter();
  const params = useSearchParams();

  const status = (params.get('status') as RoadmapStatus) ?? 'planned';

  const setStatus = (next: RoadmapStatus) => {
    const nextParams = new URLSearchParams(params.toString());
    nextParams.set('status', next);
    router.replace(`/roadmap?${nextParams.toString()}`);
  };

  return { status, setStatus };
}
