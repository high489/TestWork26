'use client'

import styles from './favorites-list.module.scss'
import { FC } from 'react'

import { CityWeatherData } from '@/models/interfaces'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { FavoritesListItem } from '../FavoritesListItem'

interface FavoritesListProps {
  favorites: string[]
  favoritesWeather: Record<string, CityWeatherData>
  removeFromFavorites: (city: string) => void
}

const FavoritesList: FC<FavoritesListProps> = ({
  favorites, favoritesWeather, removeFromFavorites 
}) => {
  if (!favorites.length) {
    return <p className='text-danger text-center mt-3'>There are no favorites cities</p>
  }

  return (
    <div className={styles['favorites-list']}>
      <Container>
        <Row xs={1} md={2} lg={3} className='g-3'>
        {favorites.map(city => {
          const data = favoritesWeather[city]
          return (
            <Col key={city}>
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
}

export { FavoritesList }