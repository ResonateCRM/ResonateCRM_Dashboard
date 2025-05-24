<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-dark-900 bg-gradient-to-br from-dark-900 to-dark-800 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-white">
         Welcome to ResonateCRM 
        </h2>
        <p class="mt-2 text-sm text-gray-400">
          Your intelligent sales companion
        </p>
      </div>
      
      <div class="glass-card p-8">
        <router-view />
      </div>
      
      <div class="text-center mt-4">
        <p class="text-sm text-gray-500">
          &copy; 2025 AI-CRM Solutions. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>