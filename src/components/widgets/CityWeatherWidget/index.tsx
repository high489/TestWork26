'use client'

import styles from './city-weather-widget.module.scss'
import { FC, useCallback, useEffect } from 'react'

import { CityWeatherData } from '@/models/interfaces'
import { CitySearch, CityWeatherCard } from '@/components/features'
import { useWeatherStore } from '@/store/stores'
import { Spinner } from 'react-bootstrap'

interface CityWeatherWidgetProps {
  initialCity: string | null
  initialWeather: CityWeatherData | null
  initialWeatherIcon: string | null
}

const CityWeatherWidget: FC<CityWeatherWidgetProps> = ({
  initialCity, initialWeather, initialWeatherIcon,
}) => {
  const {
    cityWeatherLoading: loading,
    cityWeatherError: error,
    selectedCity,
    setSelectedCity,
    currentWeather,
    weatherIconUrl,
    fetchCurrentWeather,
    addToFavorites,
  } = useWeatherStore()

  useEffect(() => {
    if (selectedCity) {
      fetchCurrentWeather(selectedCity)
    } else if (initialWeather && initialCity) {
      useWeatherStore.setState({
        selectedCity: initialCity,
        currentWeather: initialWeather,
        weatherIconUrl: initialWeatherIcon,
        cityWeatherLoading: false,
        cityWeatherError: null,
      })
    }
  }, [selectedCity, fetchCurrentWeather, initialCity, initialWeather, initialWeatherIcon])

  const handleSetCity = useCallback((city: string) => {
    setSelectedCity(city)
  }, [setSelectedCity])

  return (
    <div className={styles['city-weather-widget']}>
      <CitySearch setCity={handleSetCity} />
      
      {loading && (
        <div className="d-flex justify-content-center my-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {!loading && error && (
        <div className='text-danger text-center mt-3'>{error}</div>
      )}

      {!loading && !error && currentWeather && (
        <CityWeatherCard
          cityWeatherData={currentWeather}
          weatherIconUrl={weatherIconUrl}
          addToFavorites={addToFavorites}
        />
      )}
    </div>
  )
}

export { CityWeatherWidget }