import { reactive, computed, watch } from 'vue'

const STORAGE_KEY = 'hv_cart'
const state = reactive({ items: JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') })

watch(
  () => state.items,
  (items) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  },
  { deep: true }
)

function normalizeId(id) {
  return String(id)
}

function addItem(product, quantity = 1) {
  const id = normalizeId(product.id)
  const current = state.items[id] || 0
  state.items[id] = current + quantity
}

function setQuantity(productId, quantity) {
  const id = normalizeId(productId)
  if (quantity <= 0) {
    delete state.items[id]
  } else {
    state.items[id] = quantity
  }
}

function removeItem(productId) {
  const id = normalizeId(productId)
  delete state.items[id]
}

function clearCart() {
  state.items = {}
}

const totalQuantity = computed(() => {
  return Object.values(state.items).reduce((sum, qty) => sum + qty, 0)
})

const cartItems = computed(() => state.items)

export function useCart() {
  return {
    cartItems,
    totalQuantity,
    addItem,
    setQuantity,
    removeItem,
    clearCart,
  }
}
