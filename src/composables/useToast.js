import { ref, reactive } from 'vue'

const notifications = ref([])

let notificationId = 0

export function useToast() {
  const addNotification = (message, type = 'success', duration = 4000) => {
    const id = ++notificationId
    const notification = reactive({
      id,
      message,
      type,
      duration,
      show: true
    })

    notifications.value.push(notification)

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    return id
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearAll = () => {
    notifications.value = []
  }

  // Convenience methods
  const success = (message, duration) => addNotification(message, 'success', duration)
  const error = (message, duration) => addNotification(message, 'error', duration)
  const warning = (message, duration) => addNotification(message, 'warning', duration)
  const info = (message, duration) => addNotification(message, 'info', duration)

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  }
}