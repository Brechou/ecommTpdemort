<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const router = useRouter();
const route = useRoute()
const productId= Number(route.params.id)
console.log(productId);

const produits = ref([])
const product = ref(null)

onMounted(async()=>{
    console.log('construction...');
    
    const papa = await fetch('https://dummyjson.com/products');
    const mama = await papa.json();
    produits.value = mama.products;

     product.value = produits.value.find(
    p => p.id === Number(route.params.id)
  )  

})

const quantity = ref(0)

function addPanier(){
 quantity.value = 1
}

// augmenter / diminuer
function increment() {
  quantity.value++
}

function decrement() {
  if (quantity.value > 1) {
    quantity.value--
  } else {
    quantity.value = 0 // remet le bouton "Ajouter au panier"
  }
}

function goBack() {
  router.back();
}

</script>

<template>

  <div v-if="product">
    <img :src="product.thumbnail" :alt="product.title" />
    <h1>{{ product.title }}</h1>
    <p><strong>Description:</strong>{{ product.description }}</p>
    <p><strong>Prix:</strong>{{ product.price }}</p>
    <p><strong>Pourcentage de vente:</strong>{{ product.discountPercentage }}</p>
    <p><strong>Note:</strong>{{ product.rating }}</p>
    <p><strong>Stock disponible:</strong>{{ product.stock }}</p>
    <p><strong>Brand:</strong>{{ product.brand }}</p>
    <p><strong>Catégorie:</strong>{{ product.category }}</p>
    

    <button v-if="quantity === 0" @click="addPanier(product)">Ajouter au panier</button>

    <div v-else style="display:flex; align-items:center; justify-content:center; gap:0.5rem;">
      <button style="color: white;" @click="decrement">-</button>
      <span>{{ quantity }}</span>
      <button style="color: white;"  @click="increment">+</button>
    </div>
</div>

<p v-else>Chargement...</p>

<button class="retour" @click="goBack">Retourner en arrière</button>
</template>

<style scoped>
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
  margin: 1rem;
}

.retour{
    background-color: grey;
}

</style>
