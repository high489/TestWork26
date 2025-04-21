export const hHmMformatTime = (date: Date | string): string => {
  if (typeof date === 'string') {
    date = date.replace(' ', 'T')
  }
  
  const validDate = new Date(date);
  
  if (isNaN(validDate.getTime())) {
    return 'Invalid Time'
  }

  const time = validDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });
  
  return time.replace(/^0/, '')
};