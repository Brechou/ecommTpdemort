<script setup>

</script>

<template>
  <h1>CartItem!</h1>
  <p>
    
  </p>
</template>

<style scoped>

</style>
<!-- 
<script setup>
import { ref, watch } from "vue";

defineProps({
  product: Object,
  quantity: Number
})

const qty = ref(quantity)

// Sauvegarde la quantité dans localStorage
function saveQuantity(productId, qty) {
  const panier = JSON.parse(localStorage.getItem('panier') || '{}')
  if (qty > 0) panier[productId] = qty
  else delete panier[productId]
  localStorage.setItem('panier', JSON.stringify(panier))
}

watch(qty, (newQty) => {
  saveQuantity(product.id, newQty)
})

function increment() {
  qty.value++
}

function decrement() {
  qty.value = qty.value > 1 ? qty.value - 1 : 0
}
</script>

<template>
  <div style="display:flex; align-items:center; justify-content:space-between; padding:0.5rem; border-bottom:1px solid #ccc;">
    <div style="display:flex; align-items:center; gap:1rem;">
      <img :src="product.thumbnail" width="50" />
      <div>
        <strong>{{ product.title }}</strong> <br>
        ${{ product.price }} x {{ qty }}
      </div>
    </div>
    <div>
      <button @click="decrement">-</button>
      <button @click="increment">+</button>
    </div>
  </div>
</template>

<style scoped>
button {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  border-radius: 0.3rem;
  border: none;
  background-color: green;
  color: white;
  margin-left: 0.2rem;
}
</style>
 -->
