import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import {
  CityWeatherSlice,
  createCityWeatherSlice,
  FavoritesSlice,
  createFavoritesSlice,
  ForecastSlice,
  createForecastSlice,
  SelectedCitySlice,
  createSelectedCitySlice,
} from '@/store/slices'

export const useWeatherStore = create(
  devtools(
    persist<
    CityWeatherSlice &
    FavoritesSlice &
    ForecastSlice &
    SelectedCitySlice>(
      (...args) => ({
        ...createCityWeatherSlice(...args),
        ...createFavoritesSlice(...args),
        ...createForecastSlice(...args),
        ...createSelectedCitySlice(...args),
      }),
      {
        name: 'weather-store',
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.cityWeatherLoading = false
            state.cityWeatherError = null
            state.favoriteWeatherLoading = false
            state.favoriteWeatherError   = null
            state.forecastLoading = false
            state.forecastError = null
          }
        }
      }
    )
  )
)