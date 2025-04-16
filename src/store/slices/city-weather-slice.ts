import { StateCreator } from 'zustand'
import axios from 'axios'

import { CityWeatherData } from '@/models'
import { OWM_API_KEY, OWM_API_URL } from '@/shared'

export interface CityWeatherSlice {
  cityWeather: CityWeatherData | null
  loading: boolean
  error: string | null
  fetchWeather: (city: string) => Promise<void>
}

export const createCityWeatherSlice: StateCreator<CityWeatherSlice> = (set, get) => ({
  cityWeather: null,
  loading: false,
  error: null,
  fetchWeather: async (city: string = 'London') => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get<CityWeatherData>(
        `${OWM_API_URL}/weather`,
        {
          params: {
            q: city,
            appid: OWM_API_KEY,
          }
        }
      )
      set({ cityWeather: response.data, loading: false})
    } catch (error) {
      set({ error: 'Failed to retrieve weather data', loading: false })
    }
  }
})