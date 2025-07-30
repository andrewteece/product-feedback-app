import { create } from 'zustand';
import data from '@/lib/data/data.json';
import type { User } from '@/types/feedback';

interface UserStore {
  currentUser: User;
}

export const useUserStore = create<UserStore>(() => ({
  currentUser: {
    name: data.currentUser.name,
    username: data.currentUser.username,
    avatarUrl: data.currentUser.image, // map `image` to `avatarUrl`
  },
}));
