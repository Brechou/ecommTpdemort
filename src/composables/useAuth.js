import { reactive, computed, watch } from 'vue'

const STORAGE_USER_KEY = 'hv_user'
const STORAGE_ACCOUNTS_KEY = 'hv_accounts'

const accounts = JSON.parse(localStorage.getItem(STORAGE_ACCOUNTS_KEY) || '{}')
const state = reactive({
  user: JSON.parse(localStorage.getItem(STORAGE_USER_KEY) || 'null'),
})

watch(
  () => state.user,
  (user) => {
    if (user) {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_USER_KEY)
    }
  },
  { deep: true }
)

function saveAccounts() {
  localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(accounts))
}

function register({ email, password }) {
  if (!email || !password) {
    return { success: false, message: 'Email et mot de passe requis.' }
  }
  if (accounts[email]) {
    return { success: false, message: 'Ce compte existe déjà.' }
  }
  accounts[email] = { email, password }
  saveAccounts()
  return { success: true }
}

function login({ email, password }) {
  const account = accounts[email]
  if (!account || account.password !== password) {
    return { success: false, message: 'Email ou mot de passe incorrect.' }
  }
  state.user = { email }
  return { success: true }
}

function logout() {
  state.user = null
}

const isLoggedIn = computed(() => Boolean(state.user))
const currentUser = computed(() => state.user)

export function useAuth() {
  return {
    user: currentUser,
    isLoggedIn,
    register,
    login,
    logout,
  }
}
