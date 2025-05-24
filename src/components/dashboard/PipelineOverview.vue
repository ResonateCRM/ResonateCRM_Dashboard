<script setup lang="ts">
import { ref } from 'vue'

const stages = [
  { 
    id: 1,
    name: 'Lead', 
    count: 52, 
    value: '$438,500',
    color: 'from-blue-500 to-blue-700',
    prediction: '25%',
    deals: [
      { id: 101, name: 'TechCorp Server Upgrade', value: '$85,000' },
      { id: 102, name: 'DataSphere Cloud Migration', value: '$120,000' },
      { id: 103, name: 'NexGen Solutions Security', value: '$64,500' }
    ]
  },
  { 
    id: 2,
    name: 'Meeting', 
    count: 38, 
    value: '$785,200',
    color: 'from-indigo-500 to-indigo-700',
    prediction: '40%',
    deals: [
      { id: 201, name: 'InnovateSoft Platform', value: '$145,000' },
      { id: 202, name: 'Global Tech Expansion', value: '$230,000' },
      { id: 203, name: 'FinServe Data Analytics', value: '$175,000' }
    ]
  },
  { 
    id: 3,
    name: 'Proposal', 
    count: 24, 
    value: '$625,000',
    color: 'from-purple-500 to-purple-700',
    prediction: '65%',
    deals: [
      { id: 301, name: 'MediTech Solutions', value: '$218,000' },
      { id: 302, name: 'EduSystems LMS', value: '$145,000' },
      { id: 303, name: 'RetailOne Analytics', value: '$98,000' }
    ]
  },
  { 
    id: 4,
    name: 'Negotiation', 
    count: 16, 
    value: '$482,500',
    color: 'from-pink-500 to-pink-700',
    prediction: '85%',
    deals: [
      { id: 401, name: 'SmartCity IoT Network', value: '$320,000' },
      { id: 402, name: 'FinanceCore Banking', value: '$185,000' },
      { id: 403, name: 'AutoTech Systems', value: '$94,000' }
    ]
  },
  { 
    id: 5,
    name: 'Won', 
    count: 8, 
    value: '$347,000',
    color: 'from-primary-500 to-primary-700',
    prediction: '100%',
    deals: [
      { id: 501, name: 'Globex Corp Security', value: '$125,000' },
      { id: 502, name: 'WestTech Infrastructure', value: '$185,000' },
      { id: 503, name: 'Allied Healthcare Systems', value: '$72,000' }
    ]
  }
]

const expandedStage = ref<number | null>(null)

const toggleStage = (stageId: number) => {
  if (expandedStage.value === stageId) {
    expandedStage.value = null
  } else {
    expandedStage.value = stageId
  }
}
</script>

<template>
  <div class="space-y-4">
    <div v-for="stage in stages" :key="stage.id" class="rounded-lg overflow-hidden">
      <div 
        class="p-4 flex justify-between items-center cursor-pointer transition-colors duration-200 hover:bg-dark-700/50"
        @click="toggleStage(stage.id)"
      >
        <div class="flex items-center space-x-3">
          <div class="w-2 h-10 rounded-full bg-gradient-to-b" :class="stage.color"></div>
          <div>
            <h3 class="font-medium text-white">{{ stage.name }}</h3>
            <div class="flex items-center text-xs text-gray-400 space-x-2">
              <span>{{ stage.count }} deals</span>
              <span class="h-1 w-1 rounded-full bg-gray-500"></span>
              <span>{{ stage.value }}</span>
            </div>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <div class="bg-dark-700 px-2 py-1 rounded text-xs font-medium">
            AI Prediction: <span class="text-primary">{{ stage.prediction }}</span>
          </div>
          <svg 
            :class="[
              'w-5 h-5 text-gray-400 transition-transform duration-200',
              { 'transform rotate-180': expandedStage === stage.id }
            ]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
      
      <div v-if="expandedStage === stage.id" class="bg-dark-700/30 px-4 py-3 border-t border-dark-600">
        <div class="space-y-2">
          <div v-for="deal in stage.deals" :key="deal.id" class="flex justify-between items-center p-2 rounded hover:bg-dark-600/50">
            <span class="text-sm text-white">{{ deal.name }}</span>
            <span class="text-sm text-gray-300">{{ deal.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>