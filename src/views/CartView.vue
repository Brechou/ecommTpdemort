<script setup>

</script>

<template>
  <h1>Cart!</h1>
  <p>
    
  </p>
</template>

<style scoped>

</style>

<!-- <script setup>
import { ref, onMounted } from "vue";
import CartItem from "../components/CartItem.vue";

const panier = ref({})
const produits = ref([])

// Récupérer le panier depuis localStorage
function loadPanier() {
  panier.value = JSON.parse(localStorage.getItem('panier') || '{}')
}

// Récupérer tous les produits pour matcher les ids
onMounted(async () => {
  loadPanier()
  const res = await fetch("https://dummyjson.com/products")
  const data = await res.json()
  produits.value = data.products
})
</script>

<template>
  <div>
    <h1>Panier</h1>
    <div v-if="Object.keys(panier).length === 0">
      Votre panier est vide
    </div>
    <div v-else>
      <CartItem 
        v-for="id in Object.keys(panier)" 
        :key="id" 
        :product="produits.find(p => p.id == id)" 
        :quantity="panier[id]" 
      />
    </div>
  </div>
</template>
 -->
