'use client'

import styles from './favorites-cities-widget.module.scss'
import { FC, useEffect } from 'react'

import { useWeatherStore } from '@/store/stores'
import { Spinner } from 'react-bootstrap'
import { FavoritesList } from '@/components/features'

const FavoritesCitiesWidget: FC = () => {
  const {
    favorites,
    favoriteWeatherLoading: loading,
    favoriteWeatherError: error,
    favoritesWeather,
    fetchFavoriteWeather,
    removeFromFavorites,
  } = useWeatherStore()

  useEffect(() => {
    favorites.forEach(favCity => fetchFavoriteWeather(favCity))
  }, [favorites, fetchFavoriteWeather])

  return (
    <div className={styles['favorites-cities-widget']}>
      {loading && (
        <div className='d-flex justify-content-center my-3'>
          <Spinner animation='border' variant='primary' />
        </div>
      )}

      {!loading && error && (
        <div className='text-danger text-center mt-3'>{error}</div>
      )}

      {!loading && !error && favoritesWeather && (
        <FavoritesList
          favorites={favorites}
          favoritesWeather={favoritesWeather}
          removeFromFavorites={removeFromFavorites}
        />
      )}
    </div>
  )
}

export { FavoritesCitiesWidget }