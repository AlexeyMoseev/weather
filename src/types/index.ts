export interface WeatherData {
  id: number
  name: string
  country: string
  temp: number
  feels_like: number
  description: string
  icon: string
  wind_speed: number
  wind_deg: number
  pressure: number
  humidity: number
  dew_point: number
  visibility: number
}

export interface City {
  id: string
  name: string
  country: string
  lat: number
  lon: number
}

export interface WidgetConfig {
  cities: City[]
}

export interface OpenWeatherResponse {
  coord: {
    lon: number
    lat: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}
