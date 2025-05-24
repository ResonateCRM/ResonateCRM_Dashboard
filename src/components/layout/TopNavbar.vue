<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const user = authStore.user

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

// Call defineProps only once here:
const props = defineProps<{
  toggleSidebar: () => void
  logout: () => void
}>()

// Wrap logout to also close the dropdown
const logoutAndClose = () => {
  closeDropdown()
  props.logout()
}
</script>

<template>
  <header class="bg-dark-800 border-b border-dark-700">
    <div class="flex items-center justify-between h-16 px-4">
      <div class="flex items-center">
        <button 
          @click="props.toggleSidebar" 
          class="text-gray-400 focus:outline-none lg:hidden"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>

        <div class="ml-4 lg:ml-0">
          <h1 class="text-xl font-semibold text-white">{{ $route.name }}</h1>
        </div>
      </div>

      <div class="flex items-center ml-4">
        <div class="relative">
          <input
            type="text"
            placeholder="Search..."
            class="w-48 sm:w-64 pr-8 pl-10 py-2 input"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div class="ml-3 relative">
          <button class="p-1 text-gray-400 rounded-full hover:bg-dark-700 hover:text-white focus:outline-none">
            <span class="sr-only">View notifications</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary"></span>
          </button>
        </div>

        <!-- Profile dropdown -->
        <div class="ml-3 relative">
          <div class="flex items-center">
            <div class="hidden md:block mr-3">
              <div class="text-sm font-medium text-white">{{ user?.name }}</div>
              <div class="text-xs text-gray-400">{{ user?.email }}</div>
            </div>
            <button
              @click="toggleDropdown"
              class="flex text-sm rounded-full focus:outline-none"
            >
              <img
                class="h-8 w-8 rounded-full object-cover border-2 border-dark-600"
                :src="user?.avatar"
                alt="User avatar"
              />
            </button>
          </div>

          <!-- Dropdown menu -->
          <div
            v-if="isDropdownOpen"
            class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg glass-card ring-1 ring-black ring-opacity-5 z-50"
          >
            <div class="py-1">
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-700 hover:text-white"
              >
                Your Profile
              </a>
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-700 hover:text-white"
              >
                Settings
              </a>
              <button
                @click="logoutAndClose"
                class="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-dark-700 hover:text-white"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
