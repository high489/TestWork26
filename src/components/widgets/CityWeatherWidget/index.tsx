'use client'

import styles from './city-weather-widget.module.scss'
import { FC, useEffect } from 'react'

import { CityWeatherData } from '@/models/interfaces'
import { CitySearch, CityWeatherCard } from '@/components/features'
import { useWeatherStore } from '@/store/stores'
import { Spinner } from 'react-bootstrap'

interface CityWeatherWidgetProps {
  initialCity?: string
  initialWeather?: CityWeatherData | null
}

const CityWeatherWidget: FC<CityWeatherWidgetProps> = ({
  initialCity, initialWeather,
}) => {
  const {
    cityWeatherLoading: loading,
    cityWeatherError: error,
    selectedCity,
    setSelectedCity,
    currentWeather,
    fetchCurrentWeather,
    addToFavorites,
  } = useWeatherStore()

  useEffect(() => {
    if (selectedCity) {
      fetchCurrentWeather(selectedCity);
    } else if (initialWeather && initialCity) {
      useWeatherStore.setState({
        currentWeather: initialWeather,
        selectedCity: initialCity,
        cityWeatherLoading: false,
        cityWeatherError: null,
      })
    }
  }, [selectedCity, initialWeather, initialCity, fetchCurrentWeather])

  return (
    <div className={styles['city-weather-widget']}>
      <CitySearch
        setCity={(city) => {
          setSelectedCity(city)
          fetchCurrentWeather(city)
        }}
      />
      
      {loading && (
        <div className='d-flex justify-content-center my-3'>
          <Spinner animation='border' variant='primary' />
        </div>
      )}

      {!loading && error && (
        <div className='text-danger text-center mt-3'>{error}</div>
      )}

      {!loading && !error && currentWeather && (
        <CityWeatherCard
          cityWeatherData={currentWeather}
          addToFavorites={addToFavorites}
        />
      )}
    </div>
  )
}

export { CityWeatherWidget }