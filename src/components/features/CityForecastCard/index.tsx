'use client'

import styles from './city-forecast-card.module.scss'
import { FC } from 'react'

import { CityForecastData } from '@/models/interfaces'
import { Card } from 'react-bootstrap'
import { getOwmIconUrl, formatTimeWithOffset } from '@/shared/utils'
import Image from 'next/image'

interface CityForecastCardProps {
  cityForecastData: CityForecastData
}

const CityForecastCard: FC<CityForecastCardProps> = ({ cityForecastData }) => {
  const { timezone } = cityForecastData.city
  const forecastList = cityForecastData.list.slice(0, 5)

  return (
    <Card className={`${styles['city-forecast-card']} mt-3`}>
      <Card.Body className='d-flex flex-wrap justify-content-around gap-3'>
        {forecastList.map((forecast, index) => {
          const time = formatTimeWithOffset(forecast.dt, timezone)
          const weatherIconUrl = getOwmIconUrl(forecast.weather[0].icon, 2)
          return (
            <div key={index} className='text-center forecast-item'>
              <div className='text-muted small mb-1'>{time}</div>
              <Image
                src={weatherIconUrl}
                width={48}
                height={48}
                alt={forecast.weather[0]?.description}
                priority
              />
              <div className='fw-semibold mt-1'>{Math.round(forecast.main.temp)}°C</div>
            </div>
          )
        })}
      </Card.Body>
    </Card>
  )
}

export { CityForecastCard }