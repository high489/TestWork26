'use client'

import styles from './header.module.scss'
import Link from 'next/link'

import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => {
  return (
    <header className={styles['header']}>
      <Navbar bg="light" className="py-2">
        <Container className="d-flex justify-content-center">
          <Nav className="flex-row gap-3">
            <Link href="/" className={`nav-link ${styles['nav-link']}`}>Home</Link>
            <Link href="/forecast" className={`nav-link ${styles['nav-link']}`}>Forecast</Link>
            <Link href="/favorites" className={`nav-link ${styles['nav-link']}`}>Favorites</Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export { Header }