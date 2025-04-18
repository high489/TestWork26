export const hHmMformatTime = (date: Date | string): string => {
  const time = new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  })
  return time.replace(/^0/, '')
}