'use client'

import styles from './footer.module.scss'

const Footer = () => {
  return (
    <footer className={`container ${styles['footer']}`}>
      {new Date().getFullYear()} Weather App
    </footer>
  )
}

export { Footer }