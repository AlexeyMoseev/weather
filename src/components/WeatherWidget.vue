<template>
  <v-app class="rounded">
    <v-container class="weather-widget pa-0">
      <!-- Loading State -->
      <v-card v-if="isLoading" class="text-center pa-8" elevation="2">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        <p class="mt-4 text-body-1">Loading weather data...</p>
      </v-card>

      <!-- Error State -->
      <v-card v-else-if="error" class="text-center pa-8" elevation="2">
        <v-icon color="error" size="48" class="mb-4">mdi-alert-circle</v-icon>
        <p class="text-body-1 text-error mb-4">{{ error }}</p>
        <v-btn color="primary" @click="retry">
          <v-icon left>mdi-refresh</v-icon>
          Retry
        </v-btn>
      </v-card>

      <!-- Main Content -->
      <template v-else>
        <!-- Weather Cards View -->
        <v-card v-if="!showSettings" elevation="2">
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h5">Weather</span>
            <v-btn icon size="small" @click="toggleSettings">
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text class="pa-4">
            <WeatherCard
              v-for="(weather, index) in weatherData"
              :key="weather.id"
              :weather="weather"
              :class="{ 'mb-3': index < weatherData.length - 1 }"
            />
          </v-card-text>
        </v-card>

        <!-- Settings View -->
        <SettingsView
          v-else
          :cities="cities"
          @close="toggleSettings"
          @update:cities="handleCitiesUpdate"
        />
      </template>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import WeatherCard from './WeatherCard.vue'
import SettingsView from './SettingsView.vue'
import { StorageService } from '@/services/storage.service'
import { useWeather } from '@/composables/useWeather'
import type { City } from '@/types'

const cities = ref<City[]>([])
const showSettings = ref(false)

const { weatherData, isLoading, error, loadWeatherData, initializeWidget } = useWeather()

const toggleSettings = () => {
  showSettings.value = !showSettings.value
}

const handleCitiesUpdate = async (updatedCities: City[]) => {
  cities.value = updatedCities
  StorageService.saveCities(cities.value)
  await loadWeatherData(cities.value)
}

const retry = () => initializeWidget(cities)

onMounted(() => initializeWidget(cities))
</script>

<style lang="scss" scoped>
.weather-widget {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
::v-deep .v-application__wrap {
  min-height: 100%;
}
</style>
