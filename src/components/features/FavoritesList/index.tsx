'use client'

import styles from './favorites-list.module.scss'
import { FC, memo } from 'react'

import { CityWeatherData } from '@/models/interfaces'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { FavoritesListItem } from '../FavoritesListItem'

interface FavoritesListProps {
  favorites: string[]
  favoritesWeather: Record<string, CityWeatherData>
  removeFromFavorites: (city: string) => void
}

const FavoritesList: FC<FavoritesListProps> = memo(({
  favorites, favoritesWeather, removeFromFavorites 
}) => {
  if (!favorites.length) {
    return <p className='text-danger text-center mt-3'>There are no favorites cities</p>
  }

  return (
    <div className={styles['favorites-list']}>
      <Container>
        <Row xs={1} md={2} lg={3} className='g-3 d-flex'>
          {favorites.map(city => {
            const data = favoritesWeather[city]
            return (
              <Col key={city} xs={12} md={6} lg={4}>
                {data ? (
                  <FavoritesListItem
                    cityWeatherData={data}
                    removeFromFavorites={removeFromFavorites}
                  />
                ) : (
                  <div 
                    className='d-flex justify-content-center align-items-center'
                    style={{ height: '150px' }}
                  >
                    <Spinner animation='border' size='sm' />
                  </div>
                )}
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
})

FavoritesList.displayName = 'FavoritesList'

export { FavoritesList }