import { StateCreator } from 'zustand'
import axios, { AxiosError } from 'axios'

import { CityWeatherData } from '@/models/interfaces'
import { OWM_API_KEY, OWM_API_URL, TTL } from '@/shared/constants'

export interface FavoritesSlice {
  favorites: string[]
  addToFavorites: (city: string) => void
  removeFromFavorites: (city: string) => void

  favoriteWeatherLoading: boolean
  favoriteWeatherError: string | null
  favoritesWeather: Record<string, CityWeatherData>
  favoritesWeatherCache: Record<string, { data: CityWeatherData; timestamp: number }>
  fetchFavoriteWeather: (city: string) => Promise<void>
}

const favoritesCacheTimeToLive = TTL

export const createFavoritesSlice: StateCreator<FavoritesSlice> = (set, get) => ({
  favorites: [],
  addToFavorites: (city: string) => {
    const currentFavorites = get().favorites
    if (!currentFavorites.includes(city)) {
      set({ favorites: [...currentFavorites, city] })
    }
  },
  removeFromFavorites: (city: string) => {
    const currentFavorites = get().favorites
    set({ favorites: currentFavorites.filter((favCity) => favCity !== city) })
  },

  favoriteWeatherLoading: false,
  favoriteWeatherError: null,
  favoritesWeather: {},
  favoritesWeatherCache: {},
  fetchFavoriteWeather: async (city: string) => {
    if (!city.trim()) return

    const now = Date.now()
    const cachedWeather = get().favoritesWeatherCache[city]
    if (cachedWeather && now - cachedWeather.timestamp < favoritesCacheTimeToLive) {
      set(state => ({
        favoritesWeather: {
          ...state.favoritesWeather,
          [city]: cachedWeather.data,
        },
      }))
      return
    }

    set({ favoriteWeatherLoading: true, favoriteWeatherError: null })

    try {
      const response = await axios.get<CityWeatherData>(
        `${OWM_API_URL}/weather`,
        { params: { q: city, appid: OWM_API_KEY, units: 'metric' } }
      )

      set(state => ({
        favoritesWeatherCache: {
          ...state.favoritesWeatherCache,
          [city]: { data: response.data, timestamp: now },
        },
        favoritesWeather: {
          ...state.favoritesWeather,
          [city]: response.data,
        },
        favoriteWeatherLoading: false
      }))
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>
      console.warn('Error fetching current weather:', axiosError)
      set({
        favoriteWeatherError: axiosError.response?.data?.message || 'Failed to retrieve city weather data',
        favoriteWeatherLoading: false,
      })
    }
  }
})