import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import {
  CityWeatherSlice,
  createCityWeatherSlice,
  SelectedCitySlice,
  createSelectedCitySlice,
  FavoritesSlice,
  createFavoritesSlice,
} from '@/store/slices'

export const useWeatherStore = create(
  devtools(
    persist<CityWeatherSlice & SelectedCitySlice & FavoritesSlice>(
      (...args) => ({
        ...createCityWeatherSlice(...args),
        ...createSelectedCitySlice(...args),
        ...createFavoritesSlice(...args)
      }),
      {
        name: 'weather-store',
      }
    )
  )
)