import { OWM_ICON_BASE_URL } from '@/shared'

// OpenWeatherMap icons url
export function getOwmIconUrl(iconCode: string, size: 1 | 2 | 4 = 2): string {
  return `${OWM_ICON_BASE_URL}/${iconCode}@${size}x.png`
}