import styles from "./page.module.scss"

export default function Forecast() {
  return (
    <section className={`container ${styles['forecast']}`}>
      <h1>Forecast</h1>
    </section>
  )
}