<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()

defineProps({
  product: Object
})
function detailFunc(product) {
  router.push(`/products/${product.id}`)
}

// état local pour le panier
const quantity = ref(0)

function addPanier() {
  quantity.value = 1
}

// augmenter / diminuer
function increment() {
  quantity.value += + 1
}

function decrement() {
  quantity.value --
}

</script>

<template>
  <div>
    <img :src="product.thumbnail" :alt="product.title" @click="detailFunc(product)">
    <h3>{{ product.title }}</h3>
    <strong>price:${{ product.price }}</strong> <br>
    <strong class="ss">⭐{{ product.rating }}</strong>

    <button v-if="quantity === 0" @click="addPanier">Ajouter au panier</button>

    <div v-else style="display:flex; align-items:center; justify-content:center; gap:0.5rem;">
      <button style="color: white;" @click="decrement">-</button>
      <span>{{ quantity }}</span>
      <button style="color: white;"  @click="increment">+</button>
    </div>
  </div>
</template>

<style scoped>
div {
  width: 25rem;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  border-radius: 0.7rem;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin-inline: auto;
}

div:hover {
  transform: translateY(-3%);
}

img {
  width: 10rem;
  margin-inline: auto;
  margin-bottom: -0.4rem;
  cursor: pointer;
}

button {
  width: 15rem;
  height: 2rem;
  font-family: cursive;
  font-style: italic;
  border-style: none;
  background-color: rgba(21, 196, 15, 0.863);
  border-radius: 2rem;
  position: relative;
  margin-inline: auto;
  cursor: pointer;
}

.ss {
  margin-bottom: 1rem;
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
