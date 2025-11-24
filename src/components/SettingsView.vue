<template>
  <v-card elevation="2">
    <v-card-title class="d-flex justify-space-between align-center">
      <span class="text-h5">Settings</span>
      <v-btn icon size="small" @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text class="pa-4">
      <!-- City List -->
      <div class="mb-4">
        <v-list lines="one">
          <v-list-item
            v-for="(city, index) in localCities"
            :key="city.id"
            class="city-item px-2"
            :class="{ dragging: draggedIndex === index }"
            draggable="true"
            @dragstart="handleDragStart(index, $event)"
            @dragend="handleDragEnd"
            @dragover.prevent="handleDragOver(index)"
            @drop="handleDropComplete"
          >
            <template #prepend>
              <v-icon class="drag-handle">mdi-drag-horizontal</v-icon>
            </template>

            <v-list-item-title> {{ city.name }}, {{ city.country }} </v-list-item-title>

            <template #append>
              <v-btn icon size="small" variant="text" @click="handleRemoveCity(index)">
                <v-icon color="error">mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </div>

      <v-divider class="my-4"></v-divider>

      <!-- Add Location -->
      <div>
        <div class="text-subtitle-1 font-weight-bold mb-3">Add Location</div>

        <v-form @submit.prevent="handleAddCity">
          <v-row dense align="center">
            <v-col cols="9">
              <v-text-field
                v-model="newCityName"
                placeholder="New York"
                variant="outlined"
                density="compact"
                :disabled="isSearching"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-btn
                type="submit"
                color="primary"
                block
                :disabled="!newCityName.trim() || isSearching"
                :loading="isSearching"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

        <v-alert v-if="searchError" type="error" variant="tonal" density="compact" class="mt-3">
          {{ searchError }}
        </v-alert>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { City } from '@/types'
import { useCities } from '@/composables/useCities'
import { useDragAndDrop } from '@/composables/useDragAndDrop'

const props = defineProps<{
  cities: City[]
}>()

const emit = defineEmits<{
  close: []
  'update:cities': [cities: City[]]
}>()

const localCities = ref<City[]>([...props.cities])
const newCityName = ref('')

const { isSearching, searchError, addCity, removeCity } = useCities()
const { draggedIndex, handleDragStart, handleDragEnd, handleDragOver, handleDrop } =
  useDragAndDrop(localCities)

const handleAddCity = async () => {
  const success = await addCity(newCityName.value, localCities)
  if (success) {
    emit('update:cities', localCities.value)
    newCityName.value = ''
  }
}

const handleRemoveCity = (index: number) => {
  removeCity(index, localCities)
  emit('update:cities', localCities.value)
}

const handleDropComplete = () => {
  handleDrop()
  emit('update:cities', localCities.value)
}
</script>

<style lang="scss" scoped>
.city-item {
  cursor: move;
  transition: all 0.2s ease;
  background-color: rgba(var(--v-theme-surface), 0.5);
  border-radius: 8px;
  margin-bottom: 8px;

  &:hover {
    background-color: rgba(var(--v-theme-primary), 0.05);
  }

  &.dragging {
    opacity: 0.5;
    transform: scale(0.98);
  }
}

.drag-handle {
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}
</style>
