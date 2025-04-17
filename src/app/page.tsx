import styles from "./page.module.scss"

export default function Home() {
  return (
    <section className={`container ${styles['home']}`}>
      <h1>Home</h1>
    </section>
  )
}