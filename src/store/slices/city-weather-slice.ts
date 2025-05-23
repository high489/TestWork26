import { StateCreator } from 'zustand'
import axios, { AxiosError } from 'axios'

import { CityWeatherData } from '@/models/interfaces'
import { OWM_API_KEY, OWM_API_URL, TTL } from '@/shared/constants'
import { getOwmIconUrl } from '@/shared/utils'

export interface CityWeatherSlice {
  cityWeatherLoading: boolean
  cityWeatherError: string | null
  currentWeather: CityWeatherData | null
  weatherIconUrl: string | null
  weatherCache: Record<string, { data: CityWeatherData; weatherIconUrl: string; timestamp: number }>
  fetchCurrentWeather: (city: string) => Promise<void>
}

const weatherCacheTimeToLive = TTL

export const createCityWeatherSlice: StateCreator<CityWeatherSlice> = (set, get) => ({
  cityWeatherLoading: false,
  cityWeatherError: null,
  currentWeather: null,
  weatherIconUrl: null,
  weatherCache: {},
  fetchCurrentWeather: async (city: string) => {
    if (!city.trim()) { 
      set({ cityWeatherError: 'City name cannot be empty', cityWeatherLoading: false })
      return
    }

    const now = Date.now()
    const cachedWeather = get().weatherCache[city]
    if (cachedWeather && now - cachedWeather.timestamp < weatherCacheTimeToLive) {
      set({
        currentWeather: cachedWeather.data,
        weatherIconUrl: cachedWeather.weatherIconUrl,
        cityWeatherLoading: false,
      })
      return
    }

    set({ cityWeatherLoading: true, cityWeatherError: null })
    
    try {
      const response = await axios.get<CityWeatherData>(
        `${OWM_API_URL}/weather`,
        { params: { q: city, appid: OWM_API_KEY, units: 'metric' } }
      )
      const iconUrl = getOwmIconUrl(response.data.weather[0].icon, 4)
      set(state => ({
        weatherCache: {
          ...state.weatherCache,
          [city]: { data: response.data, weatherIconUrl: iconUrl, timestamp: now } 
        },
        currentWeather: response.data,
        weatherIconUrl: iconUrl,
        cityWeatherLoading: false,
      }))
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>
      console.warn('Error fetching current weather:', axiosError)
      set({
        cityWeatherError: axiosError.response?.data?.message || 'Failed to retrieve city weather data',
        cityWeatherLoading: false,
        weatherIconUrl: null,
      })
    }
  },
})