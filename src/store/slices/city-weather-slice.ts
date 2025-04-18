import { StateCreator } from 'zustand'
import axios, { AxiosError } from 'axios'

import { CityWeatherData } from '@/models/interfaces'
import { OWM_API_KEY, OWM_API_URL } from '@/shared/constants'

export interface CityWeatherSlice {
  cityWeatherLoading: boolean
  cityWeatherError: string | null
  currentWeather: CityWeatherData | null
  fetchCurrentWeather: (city: string) => Promise<void>
}

export const createCityWeatherSlice: StateCreator<CityWeatherSlice> = (set) => ({
  cityWeatherLoading: false,
  cityWeatherError: null,
  currentWeather: null,
  fetchCurrentWeather: async (city: string = 'London') => {
    if (!city.trim()) { 
      set({ cityWeatherError: 'City name cannot be empty', cityWeatherLoading: false })
      return
    }

    set({ cityWeatherLoading: true, cityWeatherError: null })
    try {
      const response = await axios.get<CityWeatherData>(
        `${OWM_API_URL}/weather`,
        {
          params: { 
            q: city, 
            appid: OWM_API_KEY,
            units: 'metric', 
          } 
        }
      )
      set({ currentWeather: response.data, cityWeatherLoading: false})
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>
      console.warn('Error fetching current weather:', axiosError)
      set({
        cityWeatherError: axiosError.response?.data?.message || 'Failed to retrieve city weather data',
        cityWeatherLoading: false,
      })
    }
  },
})