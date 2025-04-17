import styles from "./page.module.scss"

export default function Favorites() {
  return (
    <section className={`container ${styles['favorites']}`}>
      <h1>Favorites</h1>
    </section>
  )
}