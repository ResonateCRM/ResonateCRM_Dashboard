<template>
  <div class="p-8 bg-black min-h-screen text-white">
    <!-- Title -->
    <h1 class="text-3xl font-bold mb-5 text-[#ac0e28]">Smart Contact Scoring</h1>
    
    <!-- Search and Sort -->
    <div class="flex items-center justify-between mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search contacts..."
        class="border border-[#ac0e28] rounded-lg px-4 py-2 bg-[#1a1a1a] text-gray-200 w-1/2 placeholder-gray-400 focus:border-[#ac0e28] focus:outline-none"
      />

      <select
        v-model="selectedSort"
        class="border border-[#ac0e28] rounded-lg px-4 py-2 bg-[#1a1a1a] text-gray-200 focus:border-[#ac0e28] focus:outline-none"
      >
        <option v-for="option in sortOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>

    <!-- Contact Table -->
    <div class="overflow-x-auto bg-[#0d0d0d] rounded-lg shadow-md">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-[#111111]">
            <th class="p-3 text-left text-sm font-semibold text-gray-400">Avatar</th>
            <th class="p-3 text-left text-sm font-semibold text-gray-400">Name</th>
            <th class="p-3 text-left text-sm font-semibold text-gray-400">Email</th>
            <th class="p-3 text-left text-sm font-semibold text-gray-400">Company</th>
            <th class="p-3 text-left text-sm font-semibold text-gray-400">Position</th>
            <th class="p-3 text-left text-sm font-semibold text-gray-400">AI Score</th>
            <th class="p-3 text-left text-sm font-semibold text-gray-400">Last Contact</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="contact in sortedContacts"
            :key="contact.id"
            class="hover:bg-[#1a1a1a] transition-colors duration-150"
          >
            <td class="p-3">
              <img :src="contact.avatar" alt="Avatar" class="w-10 h-10 rounded-full border border-[#ac0e28]">
            </td>
            <td class="p-3">{{ contact.name }}</td>
            <td class="p-3">{{ contact.email }}</td>
            <td class="p-3">{{ contact.company }}</td>
            <td class="p-3">{{ contact.position }}</td>
            <td class="p-3">
              <span class="bg-[#ac0e28] text-white px-2 py-1 rounded-lg text-sm font-semibold">
                {{ contact.aiScore }}
              </span>
            </td>
            <td class="p-3">{{ contact.lastContact }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const contacts = ref([
  {
    id: 1,
    name: 'Emily Johnson',
    email: 'emily.johnson@techcorp.com',
    company: 'TechCorp',
    position: 'CTO',
    aiScore: 92,
    lastContact: '2 days ago',
    avatar: 'https://i.pravatar.cc/150?img=32'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@innovatesoft.com',
    company: 'InnovateSoft',
    position: 'CEO',
    aiScore: 89,
    lastContact: '1 week ago',
    avatar: 'https://i.pravatar.cc/150?img=11'
  }
])

const sortOptions = [
  { value: 'aiScore', label: 'AI Score: High to Low' },
  { value: 'aiScoreAsc', label: 'AI Score: Low to High' },
  { value: 'recent', label: 'Recently Contacted' },
  { value: 'name', label: 'Name A-Z' }
]

const selectedSort = ref('aiScore')
const searchQuery = ref('')

const sortedContacts = computed(() => {
  let filtered = contacts.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(contact =>
      contact.name.toLowerCase().includes(query) ||
      contact.company.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.position.toLowerCase().includes(query)
    )
  }

  return [...filtered].sort((a, b) => {
    switch (selectedSort.value) {
      case 'aiScore':
        return b.aiScore - a.aiScore
      case 'aiScoreAsc':
        return a.aiScore - b.aiScore
      case 'recent':
        return a.lastContact.localeCompare(b.lastContact)
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })
})
</script>
