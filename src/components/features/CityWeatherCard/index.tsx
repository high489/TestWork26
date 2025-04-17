'use client'

import styles from './city-weather-card.module.scss'
import { FC } from 'react'

import { CityWeatherData } from '@/models/interfaces'
import { getOwmIconUrl } from '@/shared/utils'
import { Button, Card } from 'react-bootstrap'
import Image from 'next/image'

interface CityWeatherCardProps {
  cityWeatherData: CityWeatherData
}

const CityWeatherCard: FC<CityWeatherCardProps> = ({ cityWeatherData }) => {
  const weatherIconUrl = getOwmIconUrl(cityWeatherData.weather[0].icon, 4)

  return (
    <Card className={`${styles['city-weather-card']} mt-3`}>
      <Card.Body className='d-flex align-items-center'>
        <Image
          src={weatherIconUrl}
          width={64}
          height={64}
          alt={cityWeatherData.weather[0]?.description}
        />

        <div className="ms-3 flex-grow-1">
          <h5 className="mb-1">{cityWeatherData.name}</h5>
          <h2 className="mb-0">{Math.round(cityWeatherData.main.temp)}°C</h2>
          <div className="text-muted">
            Feels like {Math.round(cityWeatherData.main.feels_like)}°
          </div>
        </div>

        <Button variant="primary">Add to favorites</Button>
      </Card.Body>
    </Card>
  )
}

export { CityWeatherCard }