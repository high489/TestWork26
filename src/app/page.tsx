import styles from "./page.module.scss"
import axios from 'axios'

import { CityWeatherData } from '@/models/interfaces'
import { OWM_API_KEY, OWM_API_URL } from '@/shared/constants'
import { getOwmIconUrl } from '@/shared/utils'
import { CityWeatherWidget } from '@/components/widgets'

async function getInitialWeatherData(defaultCity: string = 'London') {
  try {
    const weatherResponse = await axios.get<CityWeatherData>(
      `${OWM_API_URL}/weather`,
      { params: { q: defaultCity, appid: OWM_API_KEY, units: 'metric' } }
    )
    return {
      initialCity: defaultCity,
      initialWeather: weatherResponse.data,
      initialWeatherIcon: getOwmIconUrl(weatherResponse.data.weather[0].icon, 4),
    }
  } catch (error) {
    console.error('Error fetching initial data:', error)
    return {
      initialCity: defaultCity,
      initialWeather: null,
      initialWeatherIcon: null,
    }
  }
}

export default async function Home() {
  const { initialCity, initialWeatherIcon, initialWeather } = await getInitialWeatherData()

  return (
    <section className={`container ${styles['home']}`}>
      <CityWeatherWidget
        initialCity={initialCity}
        initialWeather={initialWeather}
        initialWeatherIcon={initialWeatherIcon}
      />
    </section>
  )
}
