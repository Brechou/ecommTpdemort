<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'info', 'warning'].includes(value)
  },
  duration: {
    type: Number,
    default: 4000
  },
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const visible = ref(false)
let timeoutId = null

function showToast() {
  visible.value = true
  if (props.duration > 0) {
    timeoutId = setTimeout(() => {
      hideToast()
    }, props.duration)
  }
}

function hideToast() {
  visible.value = false
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  emit('close')
}

function handleClose() {
  hideToast()
}

// Auto-show when show prop changes
if (props.show) {
  showToast()
}

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script>

<template>
  <transition name="toast" appear>
    <div
      v-if="visible"
      class="toast-notification"
      :class="`toast-${type}`"
      @click="handleClose"
    >
      <div class="toast-content">
        <div class="toast-icon">
          <span v-if="type === 'success'">✅</span>
          <span v-else-if="type === 'error'">❌</span>
          <span v-else-if="type === 'warning'">⚠️</span>
          <span v-else-if="type === 'info'">ℹ️</span>
        </div>
        <div class="toast-message">{{ message }}</div>
        <button class="toast-close" @click.stop="handleClose">×</button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.toast-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  min-width: 300px;
  max-width: 500px;
  border-radius: var(--border-radius-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  animation: slideIn 0.3s ease-out;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: white;
  border-radius: var(--border-radius-lg);
}

.toast-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.4;
}

.toast-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.toast-close:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

/* Toast types */
.toast-success .toast-content {
  border-left: 4px solid var(--success-color, #10b981);
}

.toast-error .toast-content {
  border-left: 4px solid var(--error-color, #ef4444);
}

.toast-warning .toast-content {
  border-left: 4px solid var(--warning-color, #f59e0b);
}

.toast-info .toast-content {
  border-left: 4px solid var(--info-color, #3b82f6);
}

/* Animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 480px) {
  .toast-notification {
    left: 10px;
    right: 10px;
    min-width: auto;
  }
}
</style>