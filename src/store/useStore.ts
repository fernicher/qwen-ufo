import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MediaItem { id: string; title: string; type: string; poster?: string; }

interface AuroraState {
  favorites: MediaItem[];
  toggleFavorite: (item: MediaItem) => void;
}

export const useAuroraStore = create<AuroraState>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (item) => set((state) => {
        const isFav = state.favorites.some((f) => f.id === item.id);
        return { favorites: isFav ? state.favorites.filter((f) => f.id !== item.id) : [...state.favorites, item] };
      }),
    }),
    { name: 'aurora-storage' }
  )
);
