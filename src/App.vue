<script setup>
import { ref } from 'vue'
import { useCart } from './composables/useCart'
import { useAuth } from './composables/useAuth'
import { useToast } from './composables/useToast'
import Modal from './components/Modal.vue'
import ToastNotification from './components/ToastNotification.vue'

const { totalQuantity } = useCart()
const { isLoggedIn, user, logout } = useAuth()
const { notifications, removeNotification } = useToast()

const showLogoutModal = ref(false)

function handleLogoutClick() {
  showLogoutModal.value = true
}

function confirmLogout() {
  logout()
  showLogoutModal.value = false
}

function cancelLogout() {
  showLogoutModal.value = false
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <RouterLink :to="{name:'homeView'}" class="nav-link">
        <span class="nav-icon">🏠</span>
        Accueil
      </RouterLink>
      
      <!-- Liens visibles seulement si connecté -->
      <template v-if="isLoggedIn">
        <RouterLink :to="{name:'productsView'}" class="nav-link">
          <span class="nav-icon">🛍️</span>
          Produits
        </RouterLink>
        <RouterLink :to="{name:'cartView'}" class="nav-link cart-link">
          <span class="nav-icon">🛒</span>
          Panier
          <span v-if="totalQuantity > 0" class="cart-badge">{{ totalQuantity }}</span>
        </RouterLink>
      </template>

      <div class="nav-spacer"></div>

      <div v-if="!isLoggedIn" class="auth-links">
        <RouterLink :to="{name:'inscription'}" class="nav-link btn-secondary">
          <span class="nav-icon">📝</span>
          Inscription
        </RouterLink>
        <RouterLink :to="{name:'connexion'}" class="nav-link btn-primary">
          <span class="nav-icon">🔐</span>
          Connexion
        </RouterLink>
      </div>

      <div v-else class="user-menu">
        <span class="user-greeting">
          <span class="nav-icon">👤</span>
          {{ user.email }}
        </span>
        <button class="btn btn-danger logout-btn" @click="handleLogoutClick">
          <span class="nav-icon">🚪</span>
          Déconnexion
        </button>
      </div>
    </div>
  </nav>

  <main class="main-content">
    <RouterView />
  </main>

  <Modal
    :show="showLogoutModal"
    title="Confirmer la déconnexion"
    confirm-text="Se déconnecter"
    cancel-text="Annuler"
    @confirm="confirmLogout"
    @cancel="cancelLogout"
    @close="cancelLogout"
  >
    <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
  </Modal>

  <!-- Toast Notifications -->
  <div class="toast-container">
    <ToastNotification
      v-for="notification in notifications"
      :key="notification.id"
      :message="notification.message"
      :type="notification.type"
      :duration="notification.duration"
      :show="notification.show"
      @close="removeNotification(notification.id)"
    />
  </div>
</template>

<style scoped>
.navbar {
  background: linear-gradient(135deg, var(--bg-dark) 0%, #2c3e50 100%);
  box-shadow: var(--shadow-lg);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
  min-height: 60px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.nav-icon {
  font-size: 1.1em;
}

.cart-link {
  position: relative;
}

.cart-badge {
  background-color: var(--accent-color);
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-weight: bold;
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 18px;
  text-align: center;
}

.nav-spacer {
  flex: 1;
}

.auth-links {
  display: flex;
  gap: var(--spacing-sm);
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
}

.btn-secondary:hover {
  background-color: var(--secondary-dark);
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.user-greeting {
  color: var(--text-light);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.main-content {
  min-height: calc(100vh - 60px);
  background-color: var(--bg-secondary);
}

.toast-container {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  pointer-events: none;
}

.toast-container > * {
  pointer-events: auto;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 var(--spacing-sm);
    gap: var(--spacing-sm);
    min-height: 50px;
  }

  .nav-link {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.9rem;
  }

  .nav-icon {
    font-size: 1em;
  }

  .user-menu {
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .user-greeting {
    font-size: 0.85rem;
  }

  .auth-links {
    flex-direction: column;
    width: 100%;
    margin-top: var(--spacing-sm);
  }

  .auth-links .nav-link {
    justify-content: center;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .nav-container {
    flex-direction: column;
    padding: var(--spacing-sm);
  }

  .nav-spacer {
    display: none;
  }

  .user-menu {
    width: 100%;
    justify-content: center;
  }

  .auth-links {
    width: 100%;
  }
}
</style>
