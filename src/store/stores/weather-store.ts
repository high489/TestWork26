import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import {
  CityWeatherSlice,
  createCityWeatherSlice,
} from '@/store/slices'

export const useWeatherStore = create(
  devtools(
    persist<CityWeatherSlice>(
      (...args) => ({
        ...createCityWeatherSlice(...args),
      }),
      {
        name: 'weather-store',
      }
    )
  )
)