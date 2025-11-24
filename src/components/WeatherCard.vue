<template>
  <v-card elevation="1" class="weather-card">
    <v-card-title class="pb-2">
      <v-icon left color="primary">mdi-map-marker</v-icon>
      {{ weather.name }}, {{ weather.country }}
    </v-card-title>

    <v-card-text>
      <v-row align="center" class="mb-3">
        <v-col cols="auto">
          <v-img :src="iconUrl" :alt="weather.description" width="80" height="80"></v-img>
        </v-col>
        <v-col>
          <div class="text-h3 font-weight-light">{{ weather.temp }}°C</div>
          <div class="text-subtitle-1">
            Feels like {{ weather.feels_like }}°C. {{ weather.description }}
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-3"></v-divider>

      <v-row dense class="mb-2">
        <v-col cols="6">
          <v-chip size="small" class="mr-2">
            <v-icon left size="small">mdi-weather-windy</v-icon>
            {{ weather.wind_speed }}m/s {{ windDirection }}
          </v-chip>
        </v-col>
        <v-col cols="6">
          <v-chip size="small">
            <v-icon left size="small">mdi-gauge</v-icon>
            {{ weather.pressure }}hPa
          </v-chip>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="6">
          <div class="text-caption text-medium-emphasis">
            <v-icon size="small">mdi-water-percent</v-icon>
            Humidity: {{ weather.humidity }}%
          </div>
        </v-col>
        <v-col cols="6">
          <div class="text-caption text-medium-emphasis">
            <v-icon size="small">mdi-thermometer</v-icon>
            Dew point: {{ weather.dew_point }}°C
          </div>
        </v-col>
        <v-col cols="12">
          <div class="text-caption text-medium-emphasis">
            <v-icon size="small">mdi-eye</v-icon>
            Visibility: {{ weather.visibility.toFixed(1) }}km
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { WeatherData } from '@/types'
import { getWeatherIconUrl, getWindDirection } from '@/utils/formatters'

const props = defineProps<{
  weather: WeatherData
}>()

const iconUrl = computed(() => getWeatherIconUrl(props.weather.icon))
const windDirection = computed(() => getWindDirection(props.weather.wind_deg))
</script>

<style lang="scss" scoped>
.weather-card {
  border-left: 4px solid rgb(var(--v-theme-primary));
}
</style>
