/**
 * Capitalize the first letter of each word in a string
 */
export function capitalizeDescription(description: string): string {
  return description
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Calculate dew point using Magnus formula
 * @param temp - Temperature in Celsius
 * @param humidity - Humidity percentage (0-100)
 * @returns Dew point in Celsius, rounded to nearest integer
 */
export function calculateDewPoint(temp: number, humidity: number): number {
  const a = 17.27
  const b = 237.7
  const alpha = (a * temp) / (b + temp) + Math.log(humidity / 100)
  const dewPoint = (b * alpha) / (a - alpha)
  return Math.round(dewPoint)
}

/**
 * Convert wind degree to cardinal direction
 * @param degrees - Wind direction in degrees (0-360)
 * @returns Cardinal direction (N, NE, E, SE, S, SW, W, NW, etc.)
 */
export function getWindDirection(degrees: number): string {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW'
  ]
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}

/**
 * Get weather icon URL from OpenWeatherMap
 * @param icon - Icon code from OpenWeatherMap API
 * @returns Full URL to the icon image
 */
export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}
