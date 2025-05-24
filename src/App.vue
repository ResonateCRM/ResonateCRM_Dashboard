<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

// Get the current route
const route = useRoute();

// Check if the current page is either '/login' or '/signup'
const isAuthPage = computed(() => {
  return route.path === '/login' || route.path === '/signup';
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Conditionally render header -->
    <Header v-if="!isAuthPage" />

    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Conditionally render footer -->
    <Footer v-if="!isAuthPage" />
  </div>
</template>
