import { create } from "zustand";
import type { Property } from "../services/propertyService";

interface FavoriteState {
  favorites: Property[];

  isFavorite: (propertyId: string) => boolean;
  toggleFavorite: (property: Property) => void;
  removeFavorite: (propertyId: string) => void;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],

  isFavorite: (propertyId) => {
    return get().favorites.some(
      (property) => property._id === propertyId
    );
  },

  toggleFavorite: (property) => {
    const exists = get().favorites.some(
      (item) => item._id === property._id
    );

    if (exists) {
      set((state) => ({
        favorites: state.favorites.filter(
          (item) => item._id !== property._id
        ),
      }));
    } else {
      set((state) => ({
        favorites: [...state.favorites, property],
      }));
    }
  },

  removeFavorite: (propertyId) => {
    set((state) => ({
      favorites: state.favorites.filter(
        (property) => property._id !== propertyId
      ),
    }));
  },
}));