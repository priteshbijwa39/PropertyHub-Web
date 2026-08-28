import { create } from "zustand";

interface FavoriteState {
  favoriteCount: number;
  setFavoriteCount: (count: number) => void;
}

export const useFavoriteStore = create<FavoriteState>((set) => ({
  favoriteCount: 0,

  setFavoriteCount: (count) =>
    set({
      favoriteCount: count,
    }),
}));