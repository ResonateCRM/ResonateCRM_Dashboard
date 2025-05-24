<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'   // removed useRoute import since we don't use route
import SidebarMenu from '../components/layout/SidebarMenu.vue'
import TopNavbar from '../components/layout/TopNavbar.vue'

const authStore = useAuthStore()
const router = useRouter()

const isSidebarOpen = ref(true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex h-screen bg-dark-900">
    <!-- Sidebar -->
    <div 
      :class="['glass-panel fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-300 transform lg:relative lg:translate-x-0', 
              {'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen}]"
    >
      <div class="flex items-center justify-between h-16 px-4 border-b border-dark-600">
        <!-- Logo with Link -->
        <router-link to="https://resonatecrm.com/" class="flex items-center">
          <img src="/Logo.png" alt="AI-CRM Logo" class="h-8 w-auto" />
        </router-link>
        
        <button @click="toggleSidebar" class="p-1 text-gray-400 rounded-md lg:hidden hover:text-white focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <SidebarMenu />
    </div>
    
    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <TopNavbar :toggleSidebar="toggleSidebar" :logout="logout" />
      
      <main class="flex-1 overflow-y-auto bg-dark-900 p-4">
        <div class="container mx-auto">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>
