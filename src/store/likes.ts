import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LikesStore {
  likes: number[];
  toggleLike: (id: number) => void;
  isLiked: (id: number) => boolean;
}

export const useLikesStore = create<LikesStore>()(
  persist(
    (set, get) => ({
      likes: [],
      toggleLike: (id) =>
        set((state) => ({
          likes: state.likes.includes(id)
            ? state.likes.filter((likeId) => likeId !== id)
            : [...state.likes, id],
        })),
      isLiked: (id) => get().likes.includes(id),
    }),
    {
      name: 'likes-storage',
    }
  )
);