<script setup>
const props = defineProps({
  product: Object,
  quantity: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['updateQuantity', 'remove'])

function increment() {
  emit('updateQuantity', props.product.id, props.quantity + 1)
}

function decrement() {
  const next = props.quantity - 1
  if (next > 0) {
    emit('updateQuantity', props.product.id, next)
  } else {
    emit('remove', props.product.id)
  }
}

function removeItem() {
  emit('remove', props.product.id)
}
</script>

<template>
  <div class="cart-item">
    <div class="item-left">
      <img :src="product.thumbnail" :alt="product.title" />
      <div>
        <strong>{{ product.title }}</strong>
        <p>${{ product.price }} x {{ quantity }}</p>
      </div>
    </div>
    <div class="item-actions">
      <button @click="decrement">-</button>
      <span>{{ quantity }}</span>
      <button @click="increment">+</button>
      <button class="remove-button" @click="removeItem">Supprimer</button>
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.item-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.item-left img {
  width: 80px;
  border-radius: 1rem;
}
.item-actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
button {
  border: none;
  padding: 0.6rem 0.9rem;
  border-radius: 0.8rem;
  cursor: pointer;
  background-color: #16a085;
  color: white;
}
.remove-button {
  background-color: #e74c3c;
}
</style>
