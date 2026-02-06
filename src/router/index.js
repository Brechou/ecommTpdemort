import { createRouter, createWebHistory } from 'vue-router'
// import ProductCart from "../components/ProductCart.vue";
// import CartItem from "../components/CartItem.vue";
// import PaymentForm from "../components/PaymentForm.vue";
import HomeView from "../views/HomeView.vue";
import ProductsView from "../views/ProductsView.vue";
import CartView from "../views/CartView.vue";
import ProductDetailsView from "../views/ProductDetailsView.vue";
import Inscription from "../connexIns/Inscription.vue";
import Connexion from "../connexIns/Connexion.vue";

const routes = [
  // // Page de landing / accueil simple ou connexion
 {
    path:'/',
    name:'homeView',
    component: HomeView
  },
  {
    path:'/inscription',
    name:'inscription',
    component: Inscription
  },
  {
    path:'/connexion',
    name:'connexion',
    component: Connexion
  },
  // Page d’accueil principale de la boutique
  
  {
    path:'/productsView',
    name:'productsView',
    component: ProductsView
  },
  {
    path:'/cartView',
    name:'cartView',
    component: CartView
  },
  {
    // route dynamique pour détails produit
    path:'/products/:id',
    name:'productDetails',
    component: ProductDetailsView
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
