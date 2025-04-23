'use client'

import styles from './city-search.module.scss'
import { FC, useState, ChangeEvent, KeyboardEvent, memo } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'

interface CitySearchProps {
  setCity: (city: string) => void
}

const CitySearch: FC<CitySearchProps> = memo(({ setCity }) => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSelectCity = () => {
    if (inputValue.trim()) {
      setCity(inputValue.trim()[0].toUpperCase() + inputValue.trim().slice(1))
      setInputValue('')
    } else {
      setInputValue('')
    }
  }

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSelectCity()
    }
  }

  return (
    <div className={styles['city-search']}>
      <InputGroup>
        <Form.Control
          style={{ boxShadow: 'none' }}
          type='text'
          placeholder='Enter city name'
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleEnterKey}
        />
        <Button variant='primary' onClick={handleSelectCity}>
          Search
        </Button>
      </InputGroup>
    </div>
  )
})

CitySearch.displayName = 'CitySearch'

export { CitySearch }