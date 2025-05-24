<script setup lang="ts">
import { ref, computed } from 'vue'

const pipelineStages = [
  { id: 1, name: 'Lead', color: 'bg-blue-500' },
  { id: 2, name: 'Meeting', color: 'bg-indigo-500' },
  { id: 3, name: 'Proposal', color: 'bg-purple-500' },
  { id: 4, name: 'Negotiation', color: 'bg-pink-500' },
  { id: 5, name: 'Won', color: 'bg-primary' },
  { id: 6, name: 'Lost', color: 'bg-gray-500' }
]

interface Deal {
  id: number
  name: string
  company: string
  value: number
  stage: number
  contact: string
  closingDate: string
  aiPrediction: number
  lastUpdated: string
}

const deals = ref<Deal[]>([
  {
    id: 1,
    name: 'Enterprise CRM Implementation',
    company: 'TechCorp',
    value: 85000,
    stage: 4,
    contact: 'Emily Johnson',
    closingDate: '2025-05-15',
    aiPrediction: 85,
    lastUpdated: '2 days ago'
  },
  {
    id: 2,
    name: 'Cloud Migration Project',
    company: 'DataSphere',
    value: 120000,
    stage: 3,
    contact: 'Sarah Williams',
    closingDate: '2025-06-10',
    aiPrediction: 65,
    lastUpdated: '3 days ago'
  },
  {
    id: 3,
    name: 'Security Platform Upgrade',
    company: 'NexGen Solutions',
    value: 64500,
    stage: 2,
    contact: 'David Kim',
    closingDate: '2025-07-22',
    aiPrediction: 45,
    lastUpdated: '5 days ago'
  },
  {
    id: 4,
    name: 'Software Development Platform',
    company: 'InnovateSoft',
    value: 145000,
    stage: 1,
    contact: 'Michael Chen',
    closingDate: '2025-08-30',
    aiPrediction: 25,
    lastUpdated: '1 week ago'
  },
  {
    id: 5,
    name: 'Data Analytics Suite',
    company: 'FinServe Inc.',
    value: 175000,
    stage: 2,
    contact: 'Robert Wilson',
    closingDate: '2025-06-28',
    aiPrediction: 55,
    lastUpdated: '2 weeks ago'
  },
  {
    id: 6,
    name: 'Healthcare IT Solutions',
    company: 'MediTech Solutions',
    value: 218000,
    stage: 3,
    contact: 'Amanda Lee',
    closingDate: '2025-05-20',
    aiPrediction: 70,
    lastUpdated: '4 days ago'
  },
  {
    id: 7,
    name: 'Learning Management System',
    company: 'EduSystems',
    value: 145000,
    stage: 5,
    contact: 'Thomas Brown',
    closingDate: '2025-04-30',
    aiPrediction: 100,
    lastUpdated: 'Yesterday'
  },
  {
    id: 8,
    name: 'Retail Analytics Platform',
    company: 'RetailOne',
    value: 98000,
    stage: 6,
    contact: 'Jessica Martinez',
    closingDate: '2025-04-15',
    aiPrediction: 0,
    lastUpdated: '1 day ago'
  }
])

const selectedDeal = ref<Deal | null>(null)
const isEditingDeal = ref(false)
const showPredictionDetails = ref(false)

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

const getPredictionColorClass = (prediction: number) => {
  if (prediction >= 80) return 'text-success'
  if (prediction >= 60) return 'text-primary'
  if (prediction >= 40) return 'text-warning'
  return 'text-error'
}

const totalValue = computed(() => {
  return deals.value.reduce((sum, deal) => sum + deal.value, 0)
})

const weightedValue = computed(() => {
  return deals.value.reduce((sum, deal) => {
    if (deal.stage !== 6) {
      return sum + (deal.value * deal.aiPrediction / 100)
    }
    return sum
  }, 0)
})

const dealsByStage = computed(() => {
  const result: Record<number, Deal[]> = {}
  pipelineStages.forEach(stage => {
    result[stage.id] = deals.value.filter(deal => deal.stage === stage.id)
  })
  return result
})

const stageValues = computed(() => {
  const result: Record<number, number> = {}
  pipelineStages.forEach(stage => {
    result[stage.id] = dealsByStage.value[stage.id].reduce((sum, deal) => sum + deal.value, 0)
  })
  return result
})

const selectDeal = (deal: Deal) => {
  selectedDeal.value = deal
  isEditingDeal.value = false
  showPredictionDetails.value = false
}

const getPredictionFactors = (prediction: number) => {
  const factors = []
  if (prediction >= 80) {
    factors.push({ factor: 'Active engagement', impact: 'high', description: 'Recent meetings and email opens show high interest' })
    factors.push({ factor: 'Budget approval', impact: 'high', description: 'Contact mentioned budget is approved' })
    factors.push({ factor: 'Competitor analysis', impact: 'medium', description: 'We offer better features than competitors they evaluated' })
  } else if (prediction >= 60) {
    factors.push({ factor: 'Stakeholder buy-in', impact: 'medium', description: 'Multiple stakeholders involved in discussions' })
    factors.push({ factor: 'Timeline alignment', impact: 'high', description: 'Our delivery timeline matches their needs' })
    factors.push({ factor: 'Budget uncertainty', impact: 'negative', description: 'Some concerns about total investment' })
  } else if (prediction >= 40) {
    factors.push({ factor: 'Limited engagement', impact: 'negative', description: 'Slow response to follow-ups' })
    factors.push({ factor: 'Technical fit', impact: 'high', description: 'Our solution addresses their core requirements' })
    factors.push({ factor: 'Competition', impact: 'negative', description: 'Evaluating multiple vendors' })
  } else {
    factors.push({ factor: 'Early stage', impact: 'negative', description: 'Initial conversations only' })
    factors.push({ factor: 'Budget constraints', impact: 'negative', description: 'May not have budget allocated' })
    factors.push({ factor: 'Decision timeline', impact: 'negative', description: 'Long decision-making process expected' })
  }
  return factors
}

const updateDealStage = (dealId: number, newStage: number) => {
  const dealIndex = deals.value.findIndex(d => d.id === dealId)
  if (dealIndex !== -1) {
    deals.value[dealIndex].stage = newStage
    deals.value[dealIndex].lastUpdated = 'Just now'
    if (selectedDeal.value && selectedDeal.value.id === dealId) {
      selectedDeal.value = { ...deals.value[dealIndex] }
    }
  }
}
</script>

<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-3 sm:space-y-0">
      <div>
        <h1 class="text-2xl font-semibold text-white">Pipeline Prediction</h1>
        <p class="text-gray-400">AI-driven sales pipeline analysis and forecasting</p>
      </div>
      <div class="flex space-x-3">
        <button class="btn btn-outline">
          <span class="flex items-center">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
            Filter
          </span>
        </button>
        <button class="btn btn-primary">
          <span class="flex items-center">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            New Deal
          </span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-6 gap-6 mb-8">
      <div class="sm:col-span-4 space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-white">Pipeline Stages</h2>
          <p class="text-gray-400">
            Total Value: <strong>{{ formatCurrency(totalValue) }}</strong> |
            Weighted Value: <strong>{{ formatCurrency(weightedValue) }}</strong>
          </p>
        </div>

        <div class="flex space-x-4 overflow-x-auto">
          <div
            v-for="stage in pipelineStages"
            :key="stage.id"
            class="flex-shrink-0 bg-dark-700 rounded-lg w-64 p-4 flex flex-col"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center">
                <span :class="[stage.color, 'w-4 h-4 rounded-full mr-2 inline-block']"></span>
                <h3 class="text-white font-semibold text-lg">{{ stage.name }}</h3>
              </div>
              <span class="text-gray-400 font-semibold">{{ formatCurrency(stageValues[stage.id]) }}</span>
            </div>
            <ul class="space-y-2 max-h-96 overflow-y-auto">
              <li
                v-for="deal in dealsByStage[stage.id]"
                :key="deal.id"
                class="cursor-pointer rounded border border-transparent hover:border-primary p-3 bg-dark-600"
                @click="selectDeal(deal)"
              >
                <div class="flex justify-between">
                  <div>
                    <p class="text-white font-semibold">{{ deal.name }}</p>
                    <p class="text-gray-400 text-sm">{{ deal.company }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-white font-semibold">{{ formatCurrency(deal.value) }}</p>
                    <p :class="[getPredictionColorClass(deal.aiPrediction), 'text-sm font-semibold']">
                      {{ deal.aiPrediction }}%
                    </p>
                  </div>
                </div>
                <p class="text-gray-400 text-xs mt-1">Updated: {{ deal.lastUpdated }}</p>
              </li>
              <li v-if="dealsByStage[stage.id].length === 0" class="text-gray-500 text-sm italic">
                No deals
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="sm:col-span-2 bg-dark-700 rounded-lg p-4 flex flex-col">
        <div v-if="!selectedDeal" class="text-gray-400 flex flex-col items-center justify-center flex-grow">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 2v20" />
          </svg>
          <p>Select a deal to view details</p>
        </div>

        <div v-else class="flex flex-col h-full">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-white">{{ selectedDeal.name }}</h3>
            <button
              class="btn btn-outline btn-sm"
              @click="isEditingDeal = !isEditingDeal"
            >
              {{ isEditingDeal ? 'Cancel' : 'Edit' }}
            </button>
          </div>

          <div v-if="isEditingDeal" class="space-y-3 text-white">
            <label class="block">
              <span>Deal Name</span>
              <input v-model="selectedDeal.name" type="text" class="input input-bordered w-full" />
            </label>
            <label class="block">
              <span>Company</span>
              <input v-model="selectedDeal.company" type="text" class="input input-bordered w-full" />
            </label>
            <label class="block">
              <span>Value</span>
              <input v-model.number="selectedDeal.value" type="number" class="input input-bordered w-full" />
            </label>
            <label class="block">
              <span>Contact</span>
              <input v-model="selectedDeal.contact" type="text" class="input input-bordered w-full" />
            </label>
            <label class="block">
              <span>Closing Date</span>
              <input v-model="selectedDeal.closingDate" type="date" class="input input-bordered w-full" />
            </label>
            <label class="block">
              <span>AI Prediction (%)</span>
              <input v-model.number="selectedDeal.aiPrediction" type="number" min="0" max="100" class="input input-bordered w-full" />
            </label>
            <button class="btn btn-primary mt-2" @click="isEditingDeal = false">Save</button>
          </div>

          <div v-else class="space-y-2 text-gray-300 flex-grow overflow-auto">
            <p><strong>Company:</strong> {{ selectedDeal.company }}</p>
            <p><strong>Value:</strong> {{ formatCurrency(selectedDeal.value) }}</p>
            <p><strong>Contact:</strong> {{ selectedDeal.contact }}</p>
            <p><strong>Closing Date:</strong> {{ selectedDeal.closingDate }}</p>
            <p>
              <strong>AI Prediction:</strong>
              <span :class="[getPredictionColorClass(selectedDeal.aiPrediction), 'font-semibold']">
                {{ selectedDeal.aiPrediction }}%
              </span>
              <button
                class="ml-2 text-primary text-xs underline"
                @click="showPredictionDetails = !showPredictionDetails"
              >
                {{ showPredictionDetails ? 'Hide details' : 'View details' }}
              </button>
            </p>

            <div v-if="showPredictionDetails" class="bg-dark-600 rounded p-2 mt-2">
              <h4 class="font-semibold mb-1">Prediction Factors</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li
                  v-for="factor in getPredictionFactors(selectedDeal.aiPrediction)"
                  :key="factor.factor"
                  :class="{
                    'text-success': factor.impact === 'high',
                    'text-primary': factor.impact === 'medium',
                    'text-error': factor.impact === 'negative'
                  }"
                  :title="factor.description"
                >
                  {{ factor.factor }}
                </li>
              </ul>
            </div>
          </div>

          <div class="pt-4 border-t border-dark-600">
            <h3 class="font-medium text-white mb-2">Move to stage:</h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="stage in pipelineStages"
                :key="stage.id"
                class="btn btn-outline btn-sm flex items-center"
                :class="{ 'btn-disabled opacity-50 cursor-not-allowed': stage.id === selectedDeal.stage }"
                :disabled="stage.id === selectedDeal.stage"
                @click="updateDealStage(selectedDeal.id, stage.id)"
              >
                <span :class="[stage.color, 'w-3 h-3 rounded-full mr-1 inline-block']"></span>
                {{ stage.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
