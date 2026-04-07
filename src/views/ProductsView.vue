<script setup>
import ProductCart from '../components/ProductCart.vue'
import { ref, onMounted } from 'vue'
import { useCart } from '../composables/useCart'

const produits = ref([])
const loading = ref(true)
const { totalQuantity } = useCart()

onMounted(async () => {
  const response = await fetch('https://dummyjson.com/products?limit=100')
  const data = await response.json()
  produits.value = data.products
  loading.value = false
})
</script>

<template>
  <div class="products-page container">
    <header class="page-header mb-xl">
      <div class="header-content">
        <h1 class="page-title">
          <span class="title-icon">🛍️</span>
          Nos produits
        </h1>
        <p class="page-subtitle">
          Découvrez notre sélection de produits de qualité
        </p>
      </div>

      <div class="cart-status card p-md">
        <div class="cart-info">
          <span class="cart-icon">🛒</span>
          <span class="cart-text">
            Articles dans le panier :
            <strong class="cart-count">{{ totalQuantity }}</strong>
          </span>
        </div>
        <RouterLink v-if="totalQuantity > 0" :to="{name:'cartView'}" class="btn btn-primary">
          Voir le panier
        </RouterLink>
      </div>
    </header>

    <section class="products-section">
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Chargement des produits...</p>
      </div>

      <div v-else-if="produits.length === 0" class="empty-state">
        <div class="empty-icon">📦</div>
        <h3>Aucun produit disponible</h3>
        <p>Revenez plus tard pour découvrir nos nouveaux produits.</p>
      </div>

      <div v-else class="products-grid grid">
        <div
          v-for="product in produits"
          :key="product.id"
          class="product-wrapper"
        >
          <ProductCart :product="product" />
        </div>
      </div>
    </section>

    <footer class="page-footer mt-xl text-center">
      <RouterLink :to="{name:'homeView'}" class="btn btn-secondary">
        <span class="btn-icon">🏠</span>
        Retour à l'accueil
      </RouterLink>
    </footer>
  </div>
</template>

<style scoped>
.products-page {
  padding: var(--spacing-xl) 0;
}

.page-header {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--spacing-lg);
  align-items: center;
}

.header-content {
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.title-icon {
  font-size: 2.5rem;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.cart-status {
  min-width: 250px;
}

.cart-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.cart-icon {
  font-size: 1.5rem;
}

.cart-text {
  font-weight: 500;
}

.cart-count {
  color: var(--primary-color);
  font-size: 1.1rem;
}

.products-section {
  margin-bottom: var(--spacing-xl);
}

.loading-state {
  text-align: center;
  padding: var(--spacing-xxl);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--border-color);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto var(--spacing-lg);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: var(--spacing-xxl);
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
}

.empty-state h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.products-grid {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.product-wrapper {
  display: flex;
}

.page-footer {
  padding: var(--spacing-lg);
}

/* Responsive */
@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--spacing-md);
  }
}

@media (max-width: 768px) {
  .products-page {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .page-header {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
    text-align: center;
  }

  .page-title {
    font-size: 2rem;
  }

  .title-icon {
    font-size: 2rem;
  }

  .cart-status {
    min-width: auto;
    width: 100%;
  }

  .cart-info {
    justify-content: center;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: var(--spacing-sm);
  }

  .loading-state,
  .empty-state {
    padding: var(--spacing-xl);
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .products-page {
    padding: var(--spacing-md) var(--spacing-sm);
  }

  .page-title {
    font-size: 1.8rem;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .title-icon {
    font-size: 1.8rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .page-footer {
    padding: var(--spacing-md);
  }
}
</style>
