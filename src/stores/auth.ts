import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user'
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  
  // In a real application, this would involve API calls
  function login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        // Demo only - in real app we'd validate credentials
        if (email && password) {
          const userData: User = {
            id: '1',
            name: 'John Doe',
            email: email,
            avatar: 'https://i.pravatar.cc/150?img=68',
            role: 'admin'
          }
          
          user.value = userData
          isAuthenticated.value = true
          
          // Store in localStorage for persistence
          localStorage.setItem('user', JSON.stringify(userData))
          localStorage.setItem('isAuthenticated', 'true')
          
          resolve(userData)
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 800)
    })
  }
  
  function signup(name: string, email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        if (name && email && password) {
          const userData: User = {
            id: '1',
            name: name,
            email: email,
            avatar: 'https://i.pravatar.cc/150?img=68',
            role: 'user'
          }
          
          user.value = userData
          isAuthenticated.value = true
          
          // Store in localStorage for persistence
          localStorage.setItem('user', JSON.stringify(userData))
          localStorage.setItem('isAuthenticated', 'true')
          
          resolve(userData)
        } else {
          reject(new Error('Please fill all fields'))
        }
      }, 800)
    })
  }
  
  function logout() {
    user.value = null
    isAuthenticated.value = false
    
    // Clear localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  }
  
  // Initialize from localStorage
  function initAuth() {
    const storedUser = localStorage.getItem('user')
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated')
    
    if (storedUser && storedIsAuthenticated === 'true') {
      user.value = JSON.parse(storedUser)
      isAuthenticated.value = true
    }
  }
  
  // Call init
  initAuth()
  
  return {
    user,
    isAuthenticated,
    login,
    signup,
    logout
  }
})