import { StateCreator } from 'zustand'
import axios, { AxiosError } from 'axios'

import { CityForecastData } from '@/models/interfaces'
import { OWM_API_KEY, OWM_API_URL } from '@/shared/constants'

export interface ForecastSlice {
  forecastLoading: boolean
  forecastError: string | null
  forecast: CityForecastData | null
  fetchForecast: (city: string) => Promise<void>
}

export const createForecastSlice: StateCreator<ForecastSlice> = (set) => ({
  forecastLoading: false,
  forecastError: null,
  forecast: null,
  fetchForecast: async (city: string = 'London') => {
    if (!city.trim()) { 
      set({ forecastError: 'City name cannot be empty', forecastLoading: false })
      return
    }

    set({ forecastLoading: true, forecastError: null })
    try {
      const response = await axios.get<CityForecastData>(
        `${OWM_API_URL}/forecast`,
        {
          params: { 
            q: city, 
            appid: OWM_API_KEY,
            units: 'metric', 
          } 
        }
      )
      set({ forecast: response.data, forecastLoading: false})
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>
      console.warn('Error fetching forecast:', axiosError)
      set({
        forecastError: axiosError.response?.data?.message || 'Failed to retrieve city forecast data',
        forecastLoading: false,
      })
    }
  },
})