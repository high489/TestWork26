'use client'

import styles from './favorites-list-item.module.scss'
import { FC } from 'react'

import { CityWeatherData } from '@/models/interfaces'
import { getOwmIconUrl } from '@/shared/utils'
import { Button, Card } from 'react-bootstrap'
import Image from 'next/image'

interface FavoritesListItemProps {
  cityWeatherData: CityWeatherData
  removeFromFavorites: (city: string) => void
}

const FavoritesListItem: FC<FavoritesListItemProps> = ({
  cityWeatherData, removeFromFavorites,
}) => {
  return (
    <Card className={styles['favorites-list-item']}>
      <Card.Body className='d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center'>
          <Image
            src={getOwmIconUrl(cityWeatherData.weather[0].icon, 2)}
            width={64}
            height={64}
            alt={cityWeatherData.weather[0]?.description}
            priority
          />
          <div>
            <Card.Title className={styles['city']}>{cityWeatherData.name}</Card.Title>
            <Card.Text className={styles['temp']}>
              {cityWeatherData ? Math.round(cityWeatherData.main.temp) + '°C' : '—'}
            </Card.Text>
          </div>
        </div>
        <Button
          variant='danger'
          className='fs-6 fw-bold d-flex justify-content-center align-items-center'
          style={{ width: '30px', height: '30px', paddingBottom: '8px' }}
          onClick={() => removeFromFavorites(cityWeatherData.name)}
        >
          &times;
        </Button>
      </Card.Body>
    </Card>
  )
}

export { FavoritesListItem }