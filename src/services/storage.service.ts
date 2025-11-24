import type { City, WidgetConfig } from '@/types'

const STORAGE_KEY = 'weather-widget-config'

export class StorageService {
  static saveConfig(config: WidgetConfig): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
    } catch (error) {
      console.error('Failed to save config to localStorage:', error)
    }
  }

  static loadConfig(): WidgetConfig | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (!data) return null
      return JSON.parse(data) as WidgetConfig
    } catch (error) {
      console.error('Failed to load config from localStorage:', error)
      return null
    }
  }

  static saveCities(cities: City[]): void {
    this.saveConfig({ cities })
  }

  static loadCities(): City[] {
    const config = this.loadConfig()
    return config?.cities || []
  }

  static clearConfig(): void {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear config from localStorage:', error)
    }
  }
}
