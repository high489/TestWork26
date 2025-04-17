import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles['home']}>
      <header className={`${styles['header']} container`}>Header</header>
      <section>
        <main className={`${styles['main']} container`}>Main</main>
      </section>
      <footer className={`${styles['footer']} container`}>Footer</footer>
    </div>
  );
}
