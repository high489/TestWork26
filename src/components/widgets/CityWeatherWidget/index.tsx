'use client'

import styles from './city-weather-widget.module.scss'
import { FC, useEffect } from 'react'

import { CityWeatherData, CityForecastData } from '@/models/interfaces'
import { CitySearch, CityWeatherCard } from '@/components/features'
import { useWeatherStore } from '@/store/stores'
import { Spinner } from 'react-bootstrap'

interface CityWeatherWidgetProps {
  initialCity?: string
  initialWeather?: CityWeatherData | null
  initialForecast?: CityForecastData | null
}

const CityWeatherWidget: FC<CityWeatherWidgetProps> = () => {
  const {
    loading,
    error,
    selectedCity,
    setSelectedCity,
    currentWeather,
    fetchCurrentWeather,
  } = useWeatherStore()

  return (
    <div className={styles['city-weather-widget']}>
      <CitySearch
        setCity={(city) => {
          setSelectedCity(city)
          fetchCurrentWeather(city)
        }}
      />
      
      {loading && (
        <div className="d-flex justify-content-center my-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {!loading && error && (
        <div className="text-danger text-center mt-3">{error}</div>
      )}

      {!loading && !error && currentWeather && (
        <CityWeatherCard cityWeatherData={currentWeather} />
      )}
    </div>
  )
}

export { CityWeatherWidget }