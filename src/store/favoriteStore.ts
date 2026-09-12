import { create } from "zustand";

interface FavoriteState {
  favoriteCount: number;
  favoriteIds: Set<string>;
  setFavoriteCount: (count: number) => void;
  setFavoriteIds: (ids: string[]) => void;
  setFavorite: (id: string, isFavorite: boolean) => void;
}

export const useFavoriteStore = create<FavoriteState>((set) => ({
  favoriteCount: 0,
  favoriteIds: new Set<string>(),

  setFavoriteCount: (count) =>
    set({
      favoriteCount: count,
    }),

  setFavoriteIds: (ids) =>
    set({
      favoriteIds: new Set(ids),
      favoriteCount: ids.length,
    }),

  setFavorite: (id, isFavorite) =>
    set((state) => {
      const favoriteIds = new Set(state.favoriteIds);

      if (isFavorite) {
        favoriteIds.add(id);
      } else {
        favoriteIds.delete(id);
      }

      return {
        favoriteIds,
        favoriteCount: favoriteIds.size,
      };
    }),
}));