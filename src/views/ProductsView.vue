<script setup>
import ProductCart from "../components/ProductCart.vue";

import { ref, onMounted, onUnmounted } from "vue";

const produits = ref([])

onMounted(async()=>{
    console.log('construction...');
    
    const papa = await fetch('https://dummyjson.com/products');
    const mama = await papa.json();
    produits.value = mama.products;
    console.log(produits.value);
})
// console.log(produits.value);

onUnmounted(()=>{
    console.log('produits détruitent!');
})

</script>
<template>
    <main>

        <h1>Nos produits</h1>
    <div class="divProd">
        <div v-for="product in produits" :key="product.id" class="divU">
            <ProductCart :product="product"/>
        </div>
    </div>
    <div id="divFoo">Revenir sur la page d'acceuil en cliquant
            <RouterLink :to="{name:'homeView'}">Ici</RouterLink>
    </div>
    </main>
</template>

<style scoped>
main{
    margin-top: -1.37rem;
}
.divProd{
    font-family: cursive;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr ;
    justify-content: center;
    row-gap: 2rem;
    column-gap: -8rem;
    margin-left: 1rem;
    margin-right: 1rem;
    
}
.divU{
    border-radius: 3rem;
}
#divFoo{
    margin-top: 2rem;
    height: 4rem;
    
}

</style>