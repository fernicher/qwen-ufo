import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MediaItem { id: string; title: string; type: string; poster?: string; }

export const useAuroraStore = create<any>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (item: MediaItem) => set((state: any) => {
        const isFav = state.favorites.some((f: any) => f.id === item.id);
        return { favorites: isFav ? state.favorites.filter((f: any) => f.id !== item.id) : [...state.favorites, item] };
      }),
    }),
    { name: 'aurora-storage' }
  )
);