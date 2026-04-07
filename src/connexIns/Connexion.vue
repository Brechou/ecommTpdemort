<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const route = useRoute()
const { login } = useAuth()
const email = ref('')
const password = ref('')
const message = ref('')
const successMessage = ref('')

onMounted(() => {
  // Afficher le message de succès si l'utilisateur vient de s'inscrire
  if (route.query.message && route.query.success === 'true') {
    successMessage.value = route.query.message
  }
  
  // Pré-remplir l'email si fourni
  if (route.query.email) {
    email.value = route.query.email
  }
})

function submit() {
  const result = login({ email: email.value, password: password.value })
  if (result.success) {
    // Rediriger vers la page demandée ou vers les produits par défaut
    const redirectPath = route.query.redirect || '/productsView'
    router.push(redirectPath)
  } else {
    message.value = result.message
    successMessage.value = '' // Masquer le message de succès en cas d'erreur
  }
}
</script>

<template>
  <main class="auth-page">
    <h1>Connexion</h1>
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    <div class="auth-box">
      <div class="field">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="mail@example.com" />
      </div>
      <div class="field">
        <label>Mot de passe</label>
        <input v-model="password" type="password" placeholder="••••••••" />
      </div>
      <button @click="submit">Se connecter</button>
      <p class="message" v-if="message">{{ message }}</p>
      <RouterLink :to="{name:'inscription'}">Pas encore de compte ? Inscription</RouterLink>
    </div>
  </main>
</template>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
  font-family: cursive;
}
.auth-box {
  width: min(420px, 100%);
  border-radius: 1rem;
  padding: 2rem;
  background: white;
  box-shadow: 0 10px 28px rgba(0,0,0,0.08);
}
.field {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
input {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 0.8rem;
}
button {
  width: 100%;
  padding: 0.9rem;
  border: none;
  border-radius: 1rem;
  background-color: #16a085;
  color: white;
  cursor: pointer;
}
.message {
  margin-top: 1rem;
  color: #c0392b;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #c3e6cb;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
}
</style>
