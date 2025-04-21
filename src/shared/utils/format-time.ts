export const formatTimeWithOffset = (
  utcSeconds: number,
  timezoneOffsetSeconds: number
): string => {
  const localMs = (utcSeconds + timezoneOffsetSeconds) * 1000;
  const date = new Date(localMs)

  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}