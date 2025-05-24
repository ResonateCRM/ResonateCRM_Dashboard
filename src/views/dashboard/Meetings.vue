<script setup lang="ts">
import { ref } from 'vue'

interface Participant {
  name: string
  avatar: string
}

interface Meeting {
  id: number
  title: string
  date: string
  duration: number
  participants: Participant[]
  notes: string
  summary: string | null
  processing: boolean
}

const meetings = ref<Meeting[]>([
  {
    id: 1,
    title: 'Product Demo with TechCorp',
    date: '2025-04-15T14:00:00',
    duration: 60,
    participants: [
      { name: 'Emily Johnson', avatar: 'https://i.pravatar.cc/150?img=32' },
      { name: 'David Kim', avatar: 'https://i.pravatar.cc/150?img=67' }
    ],
    notes: `- Presented new AI features for the CRM platform
- Emily showed interest in the Pipeline Prediction feature
- David had concerns about data security
- Need to prepare a detailed security whitepaper
- Follow-up: Schedule a technical deep-dive with their IT team`,
    summary: null,
    processing: false
  },
  {
    id: 2,
    title: 'Initial Discovery with DataSphere',
    date: '2025-04-12T10:30:00',
    duration: 45,
    participants: [
      { name: 'Sarah Williams', avatar: 'https://i.pravatar.cc/150?img=48' }
    ],
    notes: `- Sarah is evaluating CRM solutions for their sales team of 25
- Current pain points: lack of visibility into pipeline, manual reporting
- Looking for AI capabilities to help prioritize leads
- Mentioned budget constraints but open to higher pricing for the right solution
- Action items: Share case studies from similar-sized companies, pricing options`,
    summary: null,
    processing: false
  },
  {
    id: 3,
    title: 'Quarterly Business Review - Global Technologies',
    date: '2025-04-08T15:00:00',
    duration: 90,
    participants: [
      { name: 'Jessica Martinez', avatar: 'https://i.pravatar.cc/150?img=42' },
      { name: 'Thomas Brown', avatar: 'https://i.pravatar.cc/150?img=54' }
    ],
    notes: `- Reviewed usage statistics for the past quarter
- Team has seen 22% increase in lead conversion since implementing AI features
- Jessica raised issue with email integration occasionally failing
- Thomas requested additional training for new team members
- Renewal coming up next quarter, pricing to be discussed
- Follow-up: Fix email integration issues, schedule training session`,
    summary: 'The quarterly review with Global Technologies showed positive results with a 22% increase in lead conversion. There are some technical issues with email integration that need to be addressed. A training session for new users should be scheduled. The contract renewal is coming up next quarter, and pricing discussions will be important.',
    processing: false
  }
])

const selectedMeeting = ref<Meeting | null>(null)
const isGeneratingSummary = ref(false)

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const selectMeeting = (meeting: Meeting) => {
  selectedMeeting.value = meeting
}

const generateSummary = (meeting: Meeting) => {
  isGeneratingSummary.value = true
  meeting.processing = true

  setTimeout(() => {
    meeting.processing = false
    isGeneratingSummary.value = false

    if (meeting.id === 1) {
      meeting.summary = 'The product demo with TechCorp went well, with Emily Johnson showing particular interest in the Pipeline Prediction feature. David Kim expressed concerns about data security that should be addressed with a detailed security whitepaper. The next step is to schedule a technical deep-dive with their IT team.'
    } else if (meeting.id === 2) {
      meeting.summary = 'In the discovery call with DataSphere, Sarah Williams shared that their 25-person sales team needs better pipeline visibility and is looking to reduce manual reporting. They have budget constraints but value AI capabilities for lead prioritization. We should share relevant case studies and discuss pricing options tailored to their needs.'
    }

    selectedMeeting.value = { ...meeting }
  }, 2000)
}
</script>

<template>
  <div class="p-4 sm:p-6">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-white">Meeting Summary Generator</h1>
        <p class="text-gray-400">AI-powered meeting notes analysis and key takeaways</p>
      </div>
      <button class="btn btn-primary mt-3 sm:mt-0">
        <span class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          New Meeting
        </span>
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Panel -->
      <div class="glass-card p-5 overflow-auto max-h-[75vh]">
        <h2 class="text-lg font-semibold text-white mb-4">Recent Meetings</h2>
        <div class="space-y-3">
          <div
            v-for="meeting in meetings"
            :key="meeting.id"
            :class="[
              'p-4 rounded-lg cursor-pointer transition-all',
              selectedMeeting && selectedMeeting.id === meeting.id ? 'bg-dark-700 border border-primary/30' : 'hover:bg-dark-700/50'
            ]"
            @click="selectMeeting(meeting)"
          >
            <div class="flex justify-between items-start">
              <h3 class="font-medium text-white">{{ meeting.title }}</h3>
              <div v-if="meeting.summary" class="h-2 w-2 rounded-full bg-primary mt-1"></div>
            </div>
            <div class="text-sm text-gray-400 mt-1">
              {{ formatDate(meeting.date) }} · {{ meeting.duration }} mins
            </div>
            <div class="flex mt-3 -space-x-2">
              <img
                v-for="(participant, index) in meeting.participants.slice(0, 3)"
                :key="index"
                :src="participant.avatar"
                class="w-8 h-8 rounded-full border-2 border-dark-800"
              />
              <div
                v-if="meeting.participants.length > 3"
                class="w-8 h-8 rounded-full bg-dark-600 border-2 border-dark-800 flex items-center justify-center text-xs text-white"
              >
                +{{ meeting.participants.length - 3 }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="lg:col-span-2 glass-card p-6" v-if="selectedMeeting">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h2 class="text-xl font-semibold text-white">{{ selectedMeeting.title }}</h2>
            <p class="text-gray-400">{{ formatDate(selectedMeeting.date) }} · {{ selectedMeeting.duration }} minutes</p>
          </div>

          <button
            class="btn btn-primary"
            @click="generateSummary(selectedMeeting)"
            :disabled="isGeneratingSummary || selectedMeeting.processing || !!selectedMeeting.summary"


          >
            <span class="flex items-center">
              <svg
                v-if="isGeneratingSummary || selectedMeeting.processing"
                class="animate-spin h-4 w-4 mr-2"
                fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span>{{ isGeneratingSummary || selectedMeeting.processing ? 'Generating...' : 'Generate Summary' }}</span>
            </span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-md font-semibold text-white mb-2">Meeting Notes</h3>
            <div class="bg-dark-700/50 p-4 rounded-md text-sm text-gray-300 whitespace-pre-line overflow-y-auto max-h-[300px] min-h-[150px]">
              {{ selectedMeeting.notes }}
            </div>
          </div>

          <div>
            <h3 class="text-md font-semibold text-white mb-2">AI Summary</h3>
            <div class="bg-dark-700/50 p-4 rounded-md min-h-[150px] max-h-[300px] overflow-y-auto text-sm text-gray-300">
              <div v-if="selectedMeeting.summary">
                {{ selectedMeeting.summary }}
              </div>
              <div v-else-if="isGeneratingSummary || selectedMeeting.processing" class="flex flex-col items-center justify-center h-full">
                <div class="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mb-2"></div>
                <p class="text-gray-400">Analyzing meeting notes...</p>
              </div>
              <div v-else class="text-center text-gray-400">
                Click “Generate Summary” to analyze notes using AI.
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <h3 class="text-md font-semibold text-white mb-2">Participants</h3>
          <div class="flex flex-wrap gap-3">
            <div
              v-for="(participant, index) in selectedMeeting.participants"
              :key="index"
              class="flex items-center bg-dark-700/50 px-3 py-2 rounded-md"
            >
              <img :src="participant.avatar" class="w-8 h-8 rounded-full mr-3" />
              <span class="text-gray-300">{{ participant.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="lg:col-span-2 flex items-center justify-center text-gray-400 text-lg">
        Select a meeting to see its details.
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(23, 23, 27, 0.65);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.btn {
  @apply px-4 py-2 rounded-md font-medium transition-all;
}
.btn-primary {
  @apply bg-primary text-white hover:bg-primary/90;
}
.bg-dark-700 {
  background-color: #1e1e24;
}
.bg-dark-700\/50 {
  background-color: rgba(30, 30, 36, 0.5);
}
.border-dark-800 {
  border-color: #111118;
}
.text-primary {
  color: #ac0e28;
}
.bg-primary {
  background-color: #ac0e28;
}
</style>
