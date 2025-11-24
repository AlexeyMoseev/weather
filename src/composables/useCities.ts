import { ref, type Ref } from 'vue'
import { WeatherService } from '@/services/weather.service'
import type { City } from '@/types'

export function useCities() {
  const isSearching = ref(false)
  const searchError = ref('')

  /**
   * Add a new city to the list
   */
  const addCity = async (cityName: string, cities: Ref<City[]>): Promise<boolean> => {
    if (!cityName.trim()) return false

    isSearching.value = true
    searchError.value = ''

    try {
      const city = await WeatherService.searchCity(cityName.trim())

      if (!city) {
        searchError.value = 'City not found. Please check the spelling and try again.'
        return false
      }

      // Check if city already exists
      const exists = cities.value.some(
        (c) => c.name.toLowerCase() === city.name.toLowerCase() && c.country === city.country
      )

      if (exists) {
        searchError.value = 'This city is already in your list.'
        return false
      }

      cities.value.push(city)
      return true
    } catch (error) {
      searchError.value = 'Failed to add city. Please try again.'
      console.error('Failed to add city:', error)
      return false
    } finally {
      isSearching.value = false
    }
  }

  /**
   * Remove a city from the list
   */
  const removeCity = (index: number, cities: Ref<City[]>) => {
    cities.value.splice(index, 1)
  }

  return {
    isSearching,
    searchError,
    addCity,
    removeCity
  }
}
