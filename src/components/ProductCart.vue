<script setup>
import { useRouter } from "vue-router";

const router = useRouter()

defineProps({
    product : Object
})
function detailFunc(){
  router.push(`/products`)
}
</script>

<template>
  <div>
    <img :src="product.thumbnail" :alt="product.title" @click="detailFunc">
    <h3>{{ product.title }}</h3>
    <strong>price:${{ product.price }}</strong> <br>
    <strong class="ss">⭐{{ product.rating }}</strong>
    <button>Ajouter au panier</button>
  </div>
</template>

<style scoped>
div{
  width: 25rem;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  border-radius: 0.7rem;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin-inline: auto;
}
div:hover{
  transform: translateY(-3%);
}
img{
    width: 10rem;
    margin-inline: auto;
    margin-bottom: -0.4rem;
    cursor: pointer;
}
button{
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
.ss{
  margin-bottom: 1rem;
}
</style>