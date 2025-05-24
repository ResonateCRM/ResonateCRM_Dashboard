<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')

const signup = async () => {
  if (!name.value || !email.value || !password.value) {
    error.value = 'Please fill all fields'
    return
  }
  
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    await authStore.signup(name.value, email.value, password.value)
    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.message || 'Failed to create account'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-white mb-6">Create your account</h2>
    
    <div v-if="error" class="mb-4 px-4 py-3 rounded bg-error-700/50 text-white border border-error-600">
      {{ error }}
    </div>
    
    <form @submit.prevent="signup" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-300">Full name</label>
        <input 
          id="name" 
          v-model="name" 
          type="text" 
          required 
          class="mt-1 block w-full input" 
          placeholder="John Doe"
        >
      </div>
      
      <div>
        <label for="email" class="block text-sm font-medium text-gray-300">Email address</label>
        <input 
          id="email" 
          v-model="email" 
          type="email" 
          required 
          class="mt-1 block w-full input" 
          placeholder="you@example.com"
        >
      </div>
      
      <div>
        <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
        <input 
          id="password" 
          v-model="password" 
          type="password" 
          required 
          class="mt-1 block w-full input" 
          placeholder="••••••••"
        >
      </div>
      
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-300">Confirm password</label>
        <input 
          id="confirmPassword" 
          v-model="confirmPassword" 
          type="password" 
          required 
          class="mt-1 block w-full input" 
          placeholder="••••••••"
        >
      </div>
      
      <div>
        <button 
          type="submit" 
          class="w-full btn btn-primary flex justify-center"
          :disabled="loading"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Creating account...' : 'Sign up' }}
        </button>
      </div>
    </form>
    
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-400">
        Already have an account? 
        <router-link to="/login" class="text-primary hover:text-primary-400">
          Sign in
        </router-link>
      </p>
    </div>
  </div>
</template>