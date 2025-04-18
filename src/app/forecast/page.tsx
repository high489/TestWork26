import styles from './page.module.scss'

import { CityForecastWidget } from '@/components'

export default function Forecast() {
  return (
    <section className={`container ${styles['forecast']}`}>
      <h1 className='display-8 fw-normal text-center mb-0'>Forecast</h1>
      <CityForecastWidget />
    </section>
  )
}