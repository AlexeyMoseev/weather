import { ref, type Ref } from 'vue'

export function useDragAndDrop<T>(items: Ref<T[]>) {
  const draggedIndex = ref<number | null>(null)

  /**
   * Handle drag start event
   */
  const handleDragStart = (index: number, event: DragEvent) => {
    draggedIndex.value = index
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/html', String(index))
    }
  }

  /**
   * Handle drag end event
   */
  const handleDragEnd = () => {
    draggedIndex.value = null
  }

  /**
   * Handle drag over event - reorder items
   */
  const handleDragOver = (index: number) => {
    if (draggedIndex.value !== null && draggedIndex.value !== index) {
      const draggedItem = items.value[draggedIndex.value]
      items.value.splice(draggedIndex.value, 1)
      items.value.splice(index, 0, draggedItem)
      draggedIndex.value = index
    }
  }

  /**
   * Handle drop event
   */
  const handleDrop = () => {
    // Can be used to trigger additional actions on drop
  }

  return {
    draggedIndex,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop
  }
}
