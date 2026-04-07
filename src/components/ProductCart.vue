<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

const props = defineProps({
  product: Object,
})

const router = useRouter()
const { cartItems, addItem, setQuantity, removeItem } = useCart()

const quantity = computed(() => {
  return cartItems.value[String(props.product.id)] || 0
})

function detailFunc() {
  router.push(`/products/${product.id}`)
}

function addPanier() {
  addItem(props.product, 1)
}

function increment() {
  setQuantity(props.product.id, quantity.value + 1)
}

function decrement() {
  const next = quantity.value - 1
  if (next > 0) {
    setQuantity(props.product.id, next)
  } else {
    removeItem(props.product.id)
  }
}
</script>

<template>
  <div class="product-card">
    <img :src="product.thumbnail" :alt="product.title" @click="detailFunc" />
    <h3>{{ product.title }}</h3>
    <strong>Prix : ${{ product.price }}</strong><br>
    <strong class="ss">⭐{{ product.rating }}</strong>

    <button v-if="quantity === 0" @click="addPanier">Ajouter au panier</button>
    <div v-else class="quantity-row">
      <button @click="decrement">-</button>
      <span>{{ quantity }}</span>
      <button @click="increment">+</button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  display: grid;
  gap: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}
.product-card:hover {
  transform: translateY(-5px);
  transition: transform 0.2s ease;
}
img {
  width: 100%;
  max-width: 180px;
  margin: 0 auto;
  cursor: pointer;
}
button {
  width: 100%;
  max-width: 180px;
  height: 2.4rem;
  font-family: cursive;
  border: none;
  background-color: rgba(21, 196, 15, 0.9);
  border-radius: 1.2rem;
  color: white;
  cursor: pointer;
}
.quantity-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
}
.quantity-row button {
  width: 3rem;
  background-color: #16a085;
}
.ss {
  margin-bottom: 0.5rem;
}
</style>

<!-- <script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

defineProps({
  product: Object
})

const router = useRouter()
const quantity = ref(0)

// Récupère le panier depuis localStorage
function getQuantity(productId) {
  const panier = JSON.parse(localStorage.getItem('panier') || '{}')
  return panier[productId] || 0
}

// Sauvegarde la quantité dans localStorage
function saveQuantity(productId, qty) {
  const panier = JSON.parse(localStorage.getItem('panier') || '{}')
  if (qty > 0) panier[productId] = qty
  else delete panier[productId]
  localStorage.setItem('panier', JSON.stringify(panier))
}

// Initialiser la quantité à chaque rendu
onMounted(() => {
  if (product?.id) quantity.value = getQuantity(product.id)
})

// Surveille les changements de quantity pour mettre à jour localStorage
watch(quantity, (newQty) => {
  if (product?.id) saveQuantity(product.id, newQty)
})

function detailFunc() {
  router.push(`/products/${product.id}`)
}

function addPanier() {
  quantity.value = 1
}

function increment() {
  quantity.value++
}

function decrement() {
  quantity.value = quantity.value > 1 ? quantity.value - 1 : 0
}

</script>

<template>
  <div>
    <img :src="product.thumbnail" :alt="product.title" @click="detailFunc" />
    <h3>{{ product.title }}</h3>
    <strong>Prix: ${{ product.price }}</strong> <br>
    <strong>⭐{{ product.rating }}</strong>

    <button v-if="quantity === 0" @click="addPanier">Ajouter au panier</button>

    <div v-else style="display:flex; align-items:center; justify-content:center; gap:0.5rem;">
      <button @click="decrement">-</button>
      <span>{{ quantity }}</span>
      <button @click="increment">+</button>
    </div>
  </div>
</template>

<style scoped>
div {
  width: 20rem;
  background-color: white;
  border-radius: 0.7rem;
  padding: 1rem;
  text-align: center;
}
img {
  width: 8rem;
  cursor: pointer;
  margin-bottom: 0.5rem;
}
button {
  width: 6rem;
  height: 2rem;
  margin: 0.2rem;
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  background-color: green;
  color: white;
}
</style> -->
