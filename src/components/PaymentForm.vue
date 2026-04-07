<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '../composables/useToast'
import { useAuth } from '../composables/useAuth'
import Modal from './Modal.vue'

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['paid'])

const router = useRouter()
const { success, warning } = useToast()
const { isLoggedIn } = useAuth()

const email = ref('')
const card = ref('')
const feedback = ref('')
const showConfirmModal = ref(false)

function submitPayment() {
  // Vérifier si l'utilisateur est connecté
  if (!isLoggedIn.value) {
    warning('🔒 Vous devez être connecté pour effectuer un paiement.', 4000)
    // Rediriger vers la page de connexion avec un message
    setTimeout(() => {
      router.push({ 
        name: 'connexion', 
        query: { 
          message: 'Veuillez vous connecter pour finaliser votre paiement.',
          redirect: '/cartView'
        }
      })
    }, 1000)
    return
  }

  if (!email.value || !card.value) {
    feedback.value = 'Veuillez renseigner un email et un numéro de carte.'
    return
  }
  showConfirmModal.value = true
}

function confirmPayment() {
  feedback.value = 'Validation du paiement en cours...'
  showConfirmModal.value = false
  setTimeout(() => {
    feedback.value = 'Paiement validé ! Merci de votre commande.'
    // Afficher la notification toast
    success('🎉 Paiement effectué avec succès ! Votre commande a été confirmée.', 5000)
    emit('paid')
  }, 800)
}

function cancelPayment() {
  showConfirmModal.value = false
}
</script>

<template>
  <section class="payment-form card p-lg">
    <h2 class="text-center mb-lg">Validation de la commande</h2>

    <div class="order-summary mb-lg">
      <div class="summary-row">
        <span>Total à payer :</span>
        <strong class="total-price">${{ props.total.toFixed(2) }}</strong>
      </div>
    </div>

    <form @submit.prevent="submitPayment" class="payment-fields">
      <div class="field mb-md">
        <label for="email" class="field-label">Email de confirmation</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="votre.email@example.com"
          class="field-input"
          required
        />
      </div>

      <div class="field mb-lg">
        <label for="card" class="field-label">Numéro de carte bancaire</label>
        <input
          id="card"
          v-model="card"
          type="text"
          maxlength="19"
          placeholder="1234 5678 9012 3456"
          class="field-input"
          required
        />
      </div>

      <button
        type="submit"
        :disabled="props.total <= 0"
        class="btn btn-primary full-width"
      >
        <span class="btn-icon">💳</span>
        Procéder au paiement
      </button>
    </form>

    <p v-if="feedback" class="feedback-message" :class="{ 'success': feedback.includes('validé'), 'error': feedback.includes('Veuillez') }">
      {{ feedback }}
    </p>

    <Modal
      :show="showConfirmModal"
      title="Confirmer le paiement"
      confirm-text="Payer maintenant"
      cancel-text="Annuler"
      @confirm="confirmPayment"
      @cancel="cancelPayment"
      @close="cancelPayment"
    >
      <div class="payment-confirmation">
        <div class="confirm-icon">💳</div>
        <p class="confirm-text">
          Vous allez payer <strong>${{ props.total.toFixed(2) }}</strong> avec la carte se terminant par <strong>{{ card.slice(-4) }}</strong>
        </p>
        <p class="confirm-note">
          Une confirmation sera envoyée à <strong>{{ email }}</strong>
        </p>
      </div>
    </Modal>
  </section>
</template>

<style scoped>
.payment-form {
  max-width: 500px;
  margin: 0 auto;
}

.order-summary {
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
}

.total-price {
  color: var(--primary-color);
  font-size: 1.25rem;
}

.payment-fields {
  display: grid;
  gap: var(--spacing-md);
}

.field {
  display: grid;
  gap: var(--spacing-xs);
}

.field-label {
  font-weight: 500;
  color: var(--text-primary);
}

.field-input {
  padding: var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  transition: border-color var(--transition-fast);
}

.field-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.full-width {
  width: 100%;
  padding: var(--spacing-md);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.btn-icon {
  font-size: 1.2em;
}

.feedback-message {
  text-align: center;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  margin-top: var(--spacing-md);
}

.feedback-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.feedback-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.payment-confirmation {
  text-align: center;
  padding: var(--spacing-md);
}

.confirm-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
}

.confirm-text {
  margin-bottom: var(--spacing-md);
  font-size: 1.1rem;
}

.confirm-note {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 480px) {
  .payment-form {
    margin: 0 var(--spacing-sm);
  }

  .summary-row {
    flex-direction: column;
    gap: var(--spacing-xs);
    text-align: center;
  }

  .total-price {
    font-size: 1.5rem;
  }

  .field-input {
    padding: var(--spacing-sm);
  }

  .full-width {
    padding: var(--spacing-sm);
    font-size: 1rem;
  }
}
</style>
