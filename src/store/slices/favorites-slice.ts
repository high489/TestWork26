import { StateCreator } from 'zustand'

export interface FavoritesSlice {
  favorites: string[]
  setFavorites: (city: string) => void
}

export const createFavoritesSlice: StateCreator<FavoritesSlice> = (set, get) => ({
  favorites: [],
  setFavorites: (city: string) => {
    const currentFavorites = get().favorites
    if (!currentFavorites.includes(city)) {
      set({ favorites: [...currentFavorites, city] })
    }
  }
})