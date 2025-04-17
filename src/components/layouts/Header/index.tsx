'use client'

import styles from './header.module.scss'
import Link from 'next/link'

import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => {
  return (
    <header className={styles['header']}>
      <Navbar bg='light' expand='md'>
        <Container>
          <Navbar.Collapse id='main-navbar'>
            <Nav className='ms-auto'>
              <Link href='/' className={`nav-link ${styles['nav-link']}`}>Home</Link>
              <Link href='/forecast' className={`nav-link ${styles['nav-link']}`}>Forecast</Link>
              <Link href='/favorites' className={`nav-link ${styles['nav-link']}`}>Favorites</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export { Header }