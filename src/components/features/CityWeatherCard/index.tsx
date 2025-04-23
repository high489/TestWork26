'use client'

import styles from './city-weather-card.module.scss'
import { FC, memo } from 'react'

import { CityWeatherData } from '@/models/interfaces'
import { Button, Card } from 'react-bootstrap'
import Image from 'next/image'

interface CityWeatherCardProps {
  cityWeatherData: CityWeatherData
  weatherIconUrl: string | null
  addToFavorites: (city: string) => void
}

const CityWeatherCard: FC<CityWeatherCardProps> = memo(({
  cityWeatherData, weatherIconUrl, addToFavorites
}) => {
  return (
    <Card className={`${styles['city-weather-card']} mt-3`}>
      <Card.Body className='d-flex align-items-center'>
        {weatherIconUrl && (
          <Image
            src={weatherIconUrl}
            width={64}
            height={64}
            alt={cityWeatherData.weather[0]?.description || 'Weather icon'}
            priority
          />
        )}

        <div className='ms-3 flex-grow-1'>
          <h5 className='mb-1'>{cityWeatherData.name}</h5>
          <h2 className='mb-0'>{Math.round(cityWeatherData.main.temp)}°C</h2>
          <div className='text-muted'>
            Feels like {Math.round(cityWeatherData.main.feels_like)}°
          </div>
        </div>

        <Button
          variant='primary'
          onClick={() => addToFavorites(cityWeatherData.name)}
        >
          Add to favorites
        </Button>
      </Card.Body>
    </Card>
  )
})

CityWeatherCard.displayName = 'CityWeatherCard'

export { CityWeatherCard }