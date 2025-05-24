<script setup lang="ts">
defineProps<{
  title: string
  value: string
  change: string
  positive: boolean
  icon: string
}>()
</script>

<template>
  <div class="glass-card p-6 transition-all duration-300 hover:translate-y-[-5px]">
    <div class="flex justify-between">
      <div>
        <h3 class="text-gray-400 text-sm font-medium">{{ title }}</h3>
        <div class="mt-2 flex items-baseline">
          <p class="text-2xl font-semibold text-white">{{ value }}</p>
          <p :class="[
               'ml-2 text-sm font-medium',
               positive ? 'text-success' : 'text-error'
             ]">
            {{ change }}
          </p>
        </div>
      </div>
      
      <div :class="[
           'p-3 rounded-full flex items-center justify-center',
           'bg-gradient-to-br',
           positive ? 'from-primary-800/30 to-primary-900/30' : 'from-secondary-800/30 to-secondary-900/30'
         ]">
        <template v-if="icon === 'users'">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
        </template>
        <template v-else-if="icon === 'dollar'">
          <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </template>
        <template v-else-if="icon === 'chart'">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </template>
        <template v-else-if="icon === 'money'">
          <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </template>
      </div>
    </div>
  </div>
</template>