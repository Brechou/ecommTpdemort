<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCart } from '../composables/useCart'
import CartItem from '../components/CartItem.vue'
import PaymentForm from '../components/PaymentForm.vue'

const { cartItems, setQuantity, removeItem, clearCart } = useCart()
const products = ref([])
const loading = ref(true)
const orderValidated = ref(false)
const message = ref('')

const cartEntries = computed(() => Object.entries(cartItems.value))
const cartProducts = computed(() => {
  return cartEntries.value
    .map(([id, qty]) => {
      const product = products.value.find((item) => item.id === Number(id))
      return product ? { product, quantity: qty } : null
    })
    .filter(Boolean)
})

const totalPrice = computed(() => {
  return cartProducts.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
})

onMounted(async () => {
  const response = await fetch('https://dummyjson.com/products?limit=100')
  const data = await response.json()
  products.value = data.products
  loading.value = false
})

function updateQuantity(productId, newQuantity) {
  setQuantity(productId, newQuantity)
}

function removeProduct(productId) {
  removeItem(productId)
}

function handlePaid() {
  clearCart()
  orderValidated.value = true
  message.value = 'Merci ! Votre commande a bien été confirmée.'
}
</script>

<template>
  <section class="cart-page">
    <h1>Mon panier</h1>

    <div v-if="loading" class="empty-state">Chargement du panier...</div>
    <div v-else>
      <div v-if="cartProducts.length === 0" class="empty-state">
        Votre panier est vide.
        <RouterLink :to="{name:'productsView'}" class="link-button">Voir les produits</RouterLink>
      </div>

      <div v-else>
        <div class="cart-list">
          <CartItem
            v-for="item in cartProducts"
            :key="item.product.id"
            :product="item.product"
            :quantity="item.quantity"
            @updateQuantity="updateQuantity"
            @remove="removeProduct"
          />
        </div>

        <div class="summary">
          <h2>Résumé de la commande</h2>
          <p>Articles: {{ cartProducts.length }}</p>
          <p>Total: <strong>${{ totalPrice.toFixed(2) }}</strong></p>
          <PaymentForm :total="totalPrice" @paid="handlePaid" />
          <p v-if="orderValidated" class="success-message">{{ message }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cart-page {
  padding: 1rem;
  font-family: cursive;
}
.empty-state {
  padding: 2rem;
  text-align: center;
  color: #555;
}
.link-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.8rem 1.4rem;
  background: #16a085;
  color: white;
  border-radius: 1rem;
  text-decoration: none;
}
.cart-list {
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.summary {
  border: 1px solid #ddd;
  border-radius: 1rem;
  padding: 1.2rem;
  background: #fafafa;
}
.success-message {
  margin-top: 1rem;
  color: #2d8a3d;
}
</style>
