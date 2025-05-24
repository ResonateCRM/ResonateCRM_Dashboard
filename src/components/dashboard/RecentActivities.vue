<script setup lang="ts">
const activities = [
  {
    id: 1,
    type: 'email',
    title: 'Email sent to Emily Johnson',
    time: '10 min ago',
    description: 'Follow-up about the product demo',
  },
  {
    id: 2,
    type: 'meeting',
    title: 'Meeting with David Kim',
    time: '2 hours ago',
    description: 'Discussed implementation timeline',
  },
  {
    id: 3,
    type: 'task',
    title: 'Task completed',
    time: '3 hours ago',
    description: 'Prepared sales presentation for NextGen',
  },
  {
    id: 4,
    type: 'contact',
    title: 'New contact added',
    time: 'Yesterday',
    description: 'Sarah Williams from DataSphere',
  },
]
</script>

<template>
  <div class="space-y-4">
    <div v-for="activity in activities" :key="activity.id" class="flex space-x-3">
      <div class="flex-shrink-0">
        <div v-if="activity.type === 'email'" class="h-8 w-8 rounded-full bg-primary-700/30 flex items-center justify-center">
          <svg class="h-4 w-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        <div v-else-if="activity.type === 'meeting'" class="h-8 w-8 rounded-full bg-secondary-700/30 flex items-center justify-center">
          <svg class="h-4 w-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <div v-else-if="activity.type === 'task'" class="h-8 w-8 rounded-full bg-success-700/30 flex items-center justify-center">
          <svg class="h-4 w-4 text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
          </svg>
        </div>
        <div v-else-if="activity.type === 'contact'" class="h-8 w-8 rounded-full bg-warning-700/30 flex items-center justify-center">
          <svg class="h-4 w-4 text-warning-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
          </svg>
        </div>
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-sm font-medium text-white">{{ activity.title }}</p>
        <p class="text-xs text-gray-400">{{ activity.description }}</p>
        <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
      </div>
    </div>
  </div>
</template>