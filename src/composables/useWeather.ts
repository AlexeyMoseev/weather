import { ref, type Ref } from 'vue'
import { WeatherService } from '@/services/weather.service'
import { StorageService } from '@/services/storage.service'
import type { City, WeatherData } from '@/types'

export function useWeather() {
  const weatherData: Ref<WeatherData[]> = ref([])
  const isLoading = ref(true)
  const error = ref('')

  /**
   * Load weather data for all cities
   */
  const loadWeatherData = async (cities: City[]) => {
    isLoading.value = true
    error.value = ''

    try {
      const promises = cities.map((city) => WeatherService.getWeatherByCoords(city.lat, city.lon))
      weatherData.value = await Promise.all(promises)
    } catch (err) {
      error.value = 'Failed to load weather data. Please try again.'
      console.error('Failed to load weather data:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Initialize widget with saved or default cities
   */
  const initializeWidget = async (cities: Ref<City[]>) => {
    isLoading.value = true
    error.value = ''

    try {
      const savedCities = StorageService.loadCities()

      if (savedCities.length > 0) {
        cities.value = savedCities
      } else {
        // Try to get user's geolocation
        try {
          const position = await WeatherService.getCurrentPosition()
          const weather = await WeatherService.getWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          )

          const userCity: City = {
            id: `${weather.id}-${Date.now()}`,
            name: weather.name,
            country: weather.country,
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }

          cities.value = [userCity]
          StorageService.saveCities(cities.value)
        } catch (geoError) {
          // Fallback to default city
          console.warn('Geolocation failed:', geoError)
          const defaultCity = await WeatherService.searchCity('London')
          if (defaultCity) {
            cities.value = [defaultCity]
            StorageService.saveCities(cities.value)
          }
        }
      }

      await loadWeatherData(cities.value)
    } catch (err) {
      error.value = 'Failed to initialize widget. Please try again.'
      console.error('Failed to initialize widget:', err)
      isLoading.value = false
    }
  }

  return {
    weatherData,
    isLoading,
    error,
    loadWeatherData,
    initializeWidget
  }
}
