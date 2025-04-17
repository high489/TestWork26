import { StateCreator } from 'zustand'
import axios, { AxiosError } from 'axios'

import { CityWeatherData, CityForecastData } from '@/models'
import { OWM_API_KEY, OWM_API_URL } from '@/shared'

const baseParams = {
  appid: OWM_API_KEY,
  units: 'metric',
}

export interface CityWeatherSlice {
  loading: boolean
  error: string | null
  currentWeather: CityWeatherData | null
  forecast: CityForecastData | null
  fetchCurrentWeather: (city: string) => Promise<void>
  fetchForecast: (city: string) => Promise<void>
}

export const createCityWeatherSlice: StateCreator<CityWeatherSlice> = (set) => ({
  loading: false,
  error: null,
  currentWeather: null,
  forecast: null,
  fetchCurrentWeather: async (city: string = 'London') => {
    if (!city.trim()) { 
      set({ error: 'City name cannot be empty', loading: false })
      return
    }

    set({ loading: true, error: null })
    try {
      const response = await axios.get<CityWeatherData>(
        `${OWM_API_URL}/weather`,
        { params: { ...baseParams, q: city } }
      )
      set({ currentWeather: response.data, loading: false})
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>
      console.error('Error fetching current weather:', axiosError)
      set({
        error: axiosError.response?.data?.message || 'Failed to retrieve city weather data',
        loading: false,
      })
    }
  },
  fetchForecast: async (city: string = 'London') => {
    if (!city.trim()) { 
      set({ error: 'City name cannot be empty', loading: false })
      return
    }

    set({ loading: true, error: null })
    try {
      const response = await axios.get<CityForecastData>(
        `${OWM_API_URL}/forecast`,
        { params: { ...baseParams, q: city } }
      )
      set({ forecast: response.data, loading: false})
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>
      console.error('Error fetching forecast:', axiosError)
      set({
        error: axiosError.response?.data?.message || 'Failed to retrieve city forecast data',
        loading: false,
      })
    }
  }
})