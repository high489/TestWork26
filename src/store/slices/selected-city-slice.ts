import { StateCreator } from 'zustand'

export interface SelectedCitySlice {
  selectedCity: string
  setSelectedCity: (city: string) => void
}

export const createSelectedCitySlice: StateCreator<SelectedCitySlice> = (set) => ({
  selectedCity: 'London',
  setSelectedCity: (city: string) => set({ selectedCity: city })
})