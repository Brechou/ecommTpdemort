<script setup>
import { useAuth } from '../composables/useAuth'
const { isLoggedIn, user } = useAuth()
</script>

<template>
  <div class="home-page container">
    <section class="hero-section card p-xl text-center">
      <div class="hero-content">
        <h1 class="hero-title mb-lg">
          <span class="hero-icon">🛍️</span>
          Bienvenue dans la mini-boutique
        </h1>

        <div v-if="isLoggedIn" class="user-welcome mb-lg">
          <p class="welcome-text">
            Bonjour <strong>{{ user.email }}</strong> !
          </p>
          <p class="welcome-subtitle">
            Découvrez nos produits et commencez vos achats.
          </p>
        </div>

        <div v-else class="guest-welcome mb-lg">
          <p class="welcome-text">
            Créez un compte ou connectez-vous pour profiter pleinement de nos services.
          </p>
          <p class="welcome-subtitle">
            Accès rapide aux commandes, suivi des achats, et bien plus !
          </p>
        </div>

        <div class="hero-actions">
          <RouterLink v-if="isLoggedIn" :to="{name:'productsView'}" class="btn btn-primary btn-lg">
            <span class="btn-icon">🛒</span>
            Voir tous les produits
          </RouterLink>

          <div v-if="!isLoggedIn" class="guest-actions">
            <RouterLink :to="{name:'inscription'}" class="btn btn-primary btn-lg">
              <span class="btn-icon">📝</span>
              Créer un compte
            </RouterLink>
            <RouterLink :to="{name:'connexion'}" class="btn btn-secondary">
              <span class="btn-icon">🔐</span>
              Se connecter
            </RouterLink>
          </div>

          <div v-if="!isLoggedIn" class="auth-actions">
            <RouterLink :to="{name:'inscription'}" class="btn btn-secondary">
              <span class="btn-icon">📝</span>
              S'inscrire
            </RouterLink>
            <RouterLink :to="{name:'connexion'}" class="btn">
              <span class="btn-icon">🔐</span>
              Se connecter
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="features-grid grid">
        <div class="feature-card card p-lg text-center">
          <div class="feature-icon">🚚</div>
          <h3 class="feature-title">Livraison rapide</h3>
          <p class="feature-description">Commandez avant 14h et recevez votre colis sous 24-48h.</p>
        </div>

        <div class="feature-card card p-lg text-center">
          <div class="feature-icon">🔒</div>
          <h3 class="feature-title">Paiement sécurisé</h3>
          <p class="feature-description">Vos données bancaires sont protégées par chiffrement SSL.</p>
        </div>

        <div class="feature-card card p-lg text-center">
          <div class="feature-icon">💬</div>
          <h3 class="feature-title">Support 24/7</h3>
          <p class="feature-description">Notre équipe est là pour vous aider à tout moment.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  padding: var(--spacing-xl) 0;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  margin-bottom: var(--spacing-xxl);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="30" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="70" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
}

.hero-icon {
  font-size: 3rem;
}

.welcome-text {
  font-size: 1.2rem;
  margin-bottom: var(--spacing-sm);
}

.welcome-subtitle {
  font-size: 1rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: 1.2rem;
  font-weight: 600;
}

.btn-icon {
  font-size: 1.2em;
}

.auth-actions {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  justify-content: center;
}

.features-section {
  margin-top: var(--spacing-xxl);
}

.features-grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.feature-card {
  transition: transform var(--transition-normal);
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
}

.feature-title {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-sm);
  color: var(--primary-color);
}

.feature-description {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .home-page {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .hero-title {
    font-size: 2rem;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .hero-icon {
    font-size: 2.5rem;
  }

  .welcome-text {
    font-size: 1.1rem;
  }

  .hero-actions {
    gap: var(--spacing-md);
  }

  .btn-lg {
    padding: var(--spacing-sm) var(--spacing-lg);
    font-size: 1.1rem;
  }

  .auth-actions {
    flex-direction: column;
    width: 100%;
  }

  .auth-actions .btn {
    width: 100%;
    justify-content: center;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .feature-icon {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .hero-icon {
    font-size: 2rem;
  }

  .welcome-text {
    font-size: 1rem;
  }

  .btn-lg {
    font-size: 1rem;
  }

  .feature-title {
    font-size: 1.1rem;
  }
}
</style>
