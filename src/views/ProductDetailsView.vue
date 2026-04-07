<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

const route = useRoute()
const router = useRouter()
const productId = Number(route.params.id)
const product = ref(null)
const loading = ref(true)
const { cartItems, addItem, setQuantity } = useCart()

const quantity = computed(() => {
  return cartItems.value[String(productId)] || 0
})

onMounted(async () => {
  loading.value = true
  const response = await fetch(`https://dummyjson.com/products/${productId}`)
  product.value = await response.json()
  loading.value = false
})

function addPanier() {
  if (product.value) {
    addItem(product.value, 1)
  }
}

function increment() {
  setQuantity(productId, quantity.value + 1)
}

function decrement() {
  setQuantity(productId, Math.max(quantity.value - 1, 0))
}

function goBack() {
  router.back()
}
</script>

<template>
  <div class="product-detail-page container">
    <nav class="breadcrumb mb-lg">
      <button @click="goBack" class="btn btn-secondary">
        <span class="btn-icon">←</span>
        Retour
      </button>
    </nav>

    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Chargement du produit...</p>
    </div>

    <div v-else-if="product" class="product-content grid">
      <div class="product-image-section">
        <div class="main-image card">
          <img :src="product.thumbnail" :alt="product.title" class="product-image" />
        </div>
      </div>

      <div class="product-info-section">
        <header class="product-header mb-lg">
          <h1 class="product-title">{{ product.title }}</h1>
          <div class="product-meta">
            <span class="product-rating">
              <span class="rating-stars">⭐</span>
              {{ product.rating }}
            </span>
            <span class="product-category">{{ product.category }}</span>
          </div>
        </header>

        <div class="product-price mb-lg">
          <div class="price-display">
            <span class="current-price">${{ product.price }}</span>
            <span v-if="product.discountPercentage > 0" class="original-price">
              ${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}
            </span>
            <span v-if="product.discountPercentage > 0" class="discount-badge">
              -{{ product.discountPercentage }}%
            </span>
          </div>
        </div>

        <div class="product-description mb-lg">
          <h3>Description</h3>
          <p>{{ product.description }}</p>
        </div>

        <div class="product-details mb-lg">
          <h3>Détails du produit</h3>
          <dl class="details-list">
            <div class="detail-item">
              <dt>Marque :</dt>
              <dd>{{ product.brand }}</dd>
            </div>
            <div class="detail-item">
              <dt>Stock disponible :</dt>
              <dd :class="{ 'low-stock': product.stock < 10 }">
                {{ product.stock }} unités
              </dd>
            </div>
            <div class="detail-item">
              <dt>Catégorie :</dt>
              <dd>{{ product.category }}</dd>
            </div>
          </dl>
        </div>

        <div class="product-actions">
          <div v-if="quantity === 0" class="add-to-cart-section">
            <button @click="addPanier" class="btn btn-primary btn-lg full-width">
              <span class="btn-icon">🛒</span>
              Ajouter au panier
            </button>
          </div>

          <div v-else class="quantity-section">
            <div class="quantity-controls">
              <button @click="decrement" class="btn btn-secondary quantity-btn">-</button>
              <span class="quantity-display">{{ quantity }}</span>
              <button @click="increment" class="btn btn-secondary quantity-btn">+</button>
            </div>
            <p class="quantity-info">
              Produit ajouté au panier !
              <RouterLink :to="{name:'cartView'}" class="cart-link">Voir le panier</RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="error-state">
      <div class="error-icon">❌</div>
      <h3>Produit introuvable</h3>
      <p>Le produit demandé n'existe pas ou a été supprimé.</p>
      <RouterLink :to="{name:'productsView'}" class="btn btn-primary">
        Voir tous les produits
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.product-detail-page {
  padding: var(--spacing-xl) 0;
  max-width: 1200px;
  margin: 0 auto;
}

.breadcrumb {
  margin-bottom: var(--spacing-lg);
}

.product-content {
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxl);
  align-items: start;
}

.product-image-section {
  position: sticky;
  top: 80px;
}

.main-image {
  margin-bottom: var(--spacing-lg);
}

.product-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  border-radius: var(--border-radius-md);
}

.product-info-section {
  display: grid;
  gap: var(--spacing-lg);
}

.product-header {
  border-bottom: 2px solid var(--border-color);
  padding-bottom: var(--spacing-lg);
}

.product-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.product-meta {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-weight: 500;
  color: var(--secondary-color);
}

.rating-stars {
  font-size: 1.2em;
}

.product-category {
  background-color: var(--bg-secondary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.product-price {
  background-color: var(--bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
}

.price-display {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.current-price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
}

.original-price {
  text-decoration: line-through;
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.discount-badge {
  background-color: var(--accent-color);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-weight: 600;
  font-size: 0.9rem;
}

.product-description h3,
.product-details h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-size: 1.25rem;
}

.product-description p {
  line-height: 1.6;
  color: var(--text-secondary);
}

.details-list {
  display: grid;
  gap: var(--spacing-sm);
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-color);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item dt {
  font-weight: 600;
  color: var(--text-primary);
}

.detail-item dd {
  color: var(--text-secondary);
}

.low-stock {
  color: var(--accent-color);
  font-weight: 600;
}

.product-actions {
  margin-top: var(--spacing-lg);
}

.add-to-cart-section {
  text-align: center;
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: 1.2rem;
}

.full-width {
  width: 100%;
}

.quantity-section {
  text-align: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.quantity-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
}

.quantity-display {
  font-size: 1.5rem;
  font-weight: 700;
  min-width: 60px;
  text-align: center;
  background-color: var(--bg-secondary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
}

.quantity-info {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.cart-link {
  color: var(--primary-color);
  font-weight: 600;
}

.loading-state,
.error-state {
  text-align: center;
  padding: var(--spacing-xxl);
  color: var(--text-secondary);
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

.error-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
}

.error-state h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

/* Responsive */
@media (max-width: 1024px) {
  .product-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .product-image-section {
    position: static;
  }

  .product-title {
    font-size: 1.8rem;
  }

  .current-price {
    font-size: 1.8rem;
  }
}

@media (max-width: 768px) {
  .product-detail-page {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .product-content {
    gap: var(--spacing-lg);
  }

  .product-title {
    font-size: 1.6rem;
  }

  .current-price {
    font-size: 1.6rem;
  }

  .product-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .price-display {
    justify-content: center;
  }

  .detail-item {
    flex-direction: column;
    gap: var(--spacing-xs);
  }
}

@media (max-width: 480px) {
  .product-detail-page {
    padding: var(--spacing-md) var(--spacing-sm);
  }

  .product-title {
    font-size: 1.4rem;
  }

  .current-price {
    font-size: 1.4rem;
  }

  .quantity-controls {
    gap: var(--spacing-xs);
  }

  .quantity-btn {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .quantity-display {
    min-width: 50px;
    font-size: 1.2rem;
  }
}
</style>
