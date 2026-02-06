<script setup>

</script>

<template>
  <nav id="divSide">
    <RouterLink :to="{name:'homeView'}" class="lien">Acceuil</RouterLink>
    <RouterLink :to="{name:'productsView'}" class="lien">Produits</RouterLink>
    <!-- <RouterLink class="lien">Panier🛒</RouterLink> -->
  </nav>
  <div>
    <div>
      <RouterView />
    </div>
  </div>
</template>

<style scoped>

div{
  font-family: cursive;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.13);
  margin-top:0px ;
}
nav{
  margin: 0px;
  background-color: rgba(0, 0, 0, 0.781);
  height: 3.5rem;
  text-align: center;
}
.lien{
  margin-inline: 2rem;
  font-size: 2rem;
  color: white;
  font-family: cursive;
}
</style>
