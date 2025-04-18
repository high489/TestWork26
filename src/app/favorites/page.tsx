import styles from './page.module.scss'

import { FavoritesCitiesWidget } from '@/components/widgets'

export default function Favorites() {
  return (
    <section className={`container ${styles['favorites']}`}>
      <h1 className='display-8 fw-normal text-center mb-0'>Favorites Cities</h1>
      <FavoritesCitiesWidget />
    </section>
  )
}