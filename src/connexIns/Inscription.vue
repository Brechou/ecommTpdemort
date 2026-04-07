<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { register } = useAuth()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const message = ref('')

function submit() {
  if (password.value !== confirmPassword.value) {
    message.value = 'Les mots de passe ne correspondent pas.'
    return
  }
  const result = register({ email: email.value, password: password.value })
  if (result.success) {
    // Rediriger vers la page de connexion avec un message de succès
    router.push({ 
      name: 'connexion', 
      query: { 
        message: 'Compte créé avec succès ! Veuillez vous connecter.',
        success: 'true'
      }
    })
  } else {
    message.value = result.message
  }
}
</script>

<template>
  <main class="auth-page">
    <h1>Inscription</h1>
    <div class="auth-box">
      <div class="field">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="mail@example.com" />
      </div>
      <div class="field">
        <label>Mot de passe</label>
        <input v-model="password" type="password" placeholder="••••••••" />
      </div>
      <div class="field">
        <label>Confirmer le mot de passe</label>
        <input v-model="confirmPassword" type="password" placeholder="••••••••" />
      </div>
      <button @click="submit">Créer un compte</button>
      <p class="message" v-if="message">{{ message }}</p>
      <RouterLink :to="{name:'connexion'}">Déjà un compte ? Connexion</RouterLink>
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
</style>
