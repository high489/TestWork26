'use client'

import styles from './city-forecast-card.module.scss'
import { FC } from 'react'

import { CityForecastData } from '@/models/interfaces'
import { Card, Col, Row } from 'react-bootstrap'
import { getOwmIconUrl, hHmMformatTime } from '@/shared/utils'
import Image from 'next/image'

interface CityForecastCardProps {
  cityForecastData: CityForecastData
}

const CityForecastCard: FC<CityForecastCardProps> = ({ cityForecastData }) => {
  const forecastList = cityForecastData.list.slice(0, 5)

  return (
    <Card className={`${styles['city-forecast-card']} mt-3`}>
      <Card.Body>
        <Row className='g-3 flex-nowrap justify-content-evenly'>
          {forecastList.map((forecast, index) => {
            const weatherIconUrl = getOwmIconUrl(forecast.weather[0].icon, 2)
            return (
              <Col key={index} xs={6} md={4} lg={2} className='text-center'>
                <div className={styles['date']}>{hHmMformatTime(forecast.dt_txt)}</div>
                <Image
                  src={weatherIconUrl}
                  width={48}
                  height={48}
                  alt={forecast.weather[0]?.description}
                  priority
                />
                <div className={styles['temp']}>{Math.round(forecast.main.temp)}°C</div>
              </Col>
            )
          })}
        </Row>
      </Card.Body>
    </Card>
  )
}

export { CityForecastCard }