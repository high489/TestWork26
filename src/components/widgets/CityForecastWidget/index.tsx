'use client'

import styles from './city-forecast-widget.module.scss'
import { FC, useEffect } from 'react'

import { useWeatherStore } from '@/store/stores'
import { Spinner } from 'react-bootstrap'
import { CityForecastCard, CityWeatherCard } from '@/components/features'

const CityForecastWidget: FC = () => {
  const {
    selectedCity,
    cityWeatherLoading,
    cityWeatherError,
    currentWeather,
    fetchCurrentWeather,
    forecastLoading,
    forecastError,
    forecast,
    fetchForecast,
    addToFavorites,
  } = useWeatherStore()

  useEffect(() => {
    if (selectedCity) {
      fetchCurrentWeather(selectedCity)
      fetchForecast(selectedCity)
    }
  }, [selectedCity, fetchCurrentWeather, fetchForecast])

  return (
    <div className={styles['city-forecast-widget']}>
      {cityWeatherLoading && (
        <div className='d-flex justify-content-center my-3'>
          <Spinner animation='border' variant='primary' />
        </div>
      )}

      {!cityWeatherLoading && cityWeatherError && (
        <div className='text-danger text-center mt-3'>{cityWeatherError}</div>
      )}

      {!cityWeatherLoading && !cityWeatherError && currentWeather && (
        <CityWeatherCard
          cityWeatherData={currentWeather}
          addToFavorites={addToFavorites}
        />
      )}

      {forecastLoading && (
        <div className='d-flex justify-content-center my-3'>
          <Spinner animation='border' variant='primary' />
        </div>
      )}

      {!forecastLoading && forecastError && (
        <div className='text-danger text-center mt-3'>{forecastError}</div>
      )}

      {!forecastLoading && !forecastError && forecast && (
        <CityForecastCard cityForecastData={forecast}/>
      )}
    </div>
  )
}

export { CityForecastWidget }