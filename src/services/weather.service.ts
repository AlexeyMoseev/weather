import type { WeatherData, OpenWeatherResponse, City } from '@/types'
import { calculateDewPoint, capitalizeDescription } from '@/utils/formatters'

const API_KEY = process.env.OPENWEATHER_API_KEY || ''
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

if (!API_KEY) {
  console.error(
    'OpenWeatherMap API key is missing. Please add OPENWEATHER_API_KEY to your .env file.'
  )
}

export class WeatherService {
  private static readonly apiKey = API_KEY

  static async getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'))
        return
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 10000,
        enableHighAccuracy: true
      })
    })
  }

  static async getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data: OpenWeatherResponse = await response.json()
    return this.transformWeatherData(data)
  }

  static async searchCity(query: string): Promise<City | null> {
    try {
      const url = `${BASE_URL}/weather?q=${encodeURIComponent(query)}&units=metric&appid=${this.apiKey}`
      const response = await fetch(url)

      if (!response.ok) {
        return null
      }

      const data: OpenWeatherResponse = await response.json()
      return {
        id: `${data.id}-${Date.now()}`,
        name: data.name,
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon
      }
    } catch (error) {
      console.error('Failed to search city:', error)
      return null
    }
  }

  private static transformWeatherData(data: OpenWeatherResponse): WeatherData {
    // Calculate dew point using Magnus formula
    const dewPoint = calculateDewPoint(data.main.temp, data.main.humidity)

    return {
      id: data.id,
      name: data.name,
      country: data.sys.country,
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      description: capitalizeDescription(data.weather[0].description),
      icon: data.weather[0].icon,
      wind_speed: data.wind.speed,
      wind_deg: data.wind.deg,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      dew_point: dewPoint,
      visibility: data.visibility / 1000 // Convert to km
    }
  }
}
