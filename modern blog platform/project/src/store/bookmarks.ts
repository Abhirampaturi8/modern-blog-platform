import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookmarkStore {
  bookmarks: number[];
  addBookmark: (id: number) => void;
  removeBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (id) => set((state) => ({ bookmarks: [...state.bookmarks, id] })),
      removeBookmark: (id) =>
        set((state) => ({ bookmarks: state.bookmarks.filter((b) => b !== id) })),
      isBookmarked: (id) => get().bookmarks.includes(id),
    }),
    {
      name: 'bookmarks-storage',
    }
  )
);