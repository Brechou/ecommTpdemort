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
import { useAuth } from '../composables/useAuth.js'

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
  // Page d'accueil principale de la boutique - REQUIERT AUTHENTIFICATION
  
  {
    path:'/productsView',
    name:'productsView',
    component: ProductsView,
    meta: { requiresAuth: true }
  },
  {
    path:'/cartView',
    name:'cartView',
    component: CartView,
    meta: { requiresAuth: true }
  },
  {
    // route dynamique pour détails produit - REQUIERT AUTHENTIFICATION
    path:'/products/:id',
    name:'productDetails',
    component: ProductDetailsView,
    meta: { requiresAuth: true }
  },
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Protection des routes
router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useAuth()
  
  // Si la route nécessite une authentification et que l'utilisateur n'est pas connecté
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    // Rediriger vers la page de connexion avec le chemin demandé en paramètre
    next({ 
      name: 'connexion', 
      query: { redirect: to.fullPath } 
    })
  } else {
    next()
  }
})

export default router
