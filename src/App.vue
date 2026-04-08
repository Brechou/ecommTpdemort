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
const mobileMenuOpen = ref(false)

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

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <RouterLink :to="{name:'homeView'}" class="nav-link">
        <span class="nav-icon">🏠</span>
        Accueil
      </RouterLink>
      
      <!-- Mobile menu button -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu" :class="{ 'open': mobileMenuOpen }">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- Navigation links -->
      <div class="nav-links" :class="{ 'open': mobileMenuOpen }">
        <!-- Liens visibles seulement si connecté -->
        <template v-if="isLoggedIn">
          <RouterLink :to="{name:'productsView'}" class="nav-link" @click="mobileMenuOpen = false">
            <span class="nav-icon">🛍️</span>
            Produits
          </RouterLink>
          <RouterLink :to="{name:'cartView'}" class="nav-link cart-link" @click="mobileMenuOpen = false">
            <span class="nav-icon">🛒</span>
            Panier
            <span v-if="totalQuantity > 0" class="cart-badge">{{ totalQuantity }}</span>
          </RouterLink>
        </template>

        <div v-if="!isLoggedIn" class="auth-links">
          <RouterLink :to="{name:'inscription'}" class="nav-link btn-secondary" @click="mobileMenuOpen = false">
            <span class="nav-icon">📝</span>
            Inscription
          </RouterLink>
          <RouterLink :to="{name:'connexion'}" class="nav-link btn-primary" @click="mobileMenuOpen = false">
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
  position: relative;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-md);
  transition: background-color var(--transition-fast);
}

.mobile-menu-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background-color: white;
  margin: 2px 0;
  transition: all var(--transition-fast);
}

.mobile-menu-btn.open .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-btn.open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.open .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.cart-badge {
  background-color: var(--accent-color);
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-weight: bold;
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
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

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, var(--bg-dark) 0%, #2c3e50 100%);
    flex-direction: column;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    box-shadow: var(--shadow-lg);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-normal);
  }

  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .nav-link {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 0.9rem;
    width: 100%;
    justify-content: flex-start;
  }

  .nav-icon {
    font-size: 1em;
  }

  .auth-links {
    flex-direction: column;
    gap: var(--spacing-sm);
    width: 100%;
  }

  .auth-links .nav-link {
    justify-content: center;
  }

  .user-menu {
    flex-direction: column;
    gap: var(--spacing-sm);
    width: 100%;
  }

  .user-greeting {
    justify-content: center;
  }

  .logout-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
