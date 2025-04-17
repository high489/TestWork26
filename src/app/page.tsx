import styles from "./page.module.scss"
import axios from 'axios'

import { CityWeatherData } from '@/models/interfaces'
import { OWM_API_KEY, OWM_API_URL } from '@/shared/constants'
import { CityWeatherWidget } from '@/components/widgets'

async function getInitialWeatherData(defaultCity: string = 'London') {
  try {
    const weatherResponse = await axios.get<CityWeatherData>(
      `${OWM_API_URL}/weather`,
      { params: { q: defaultCity, appid: OWM_API_KEY, units: 'metric' } }
    )
    return {
      initialWeather: weatherResponse.data,
      initialCity: defaultCity,
    }
  } catch (error) {
    console.error('Error fetching initial data:', error)
    return {
      initialWeather: null,
      initialCity: defaultCity,
    }
  }
}

export default async function Home() {
  const { initialCity, initialWeather } = await getInitialWeatherData()

  return (
    <section className={`container ${styles['home']}`}>
      <CityWeatherWidget
        initialCity={initialCity}
        initialWeather={initialWeather}
      />
    </section>
  )
}
