<template>
  <div class="p-6 max-w-3xl mx-auto bg-black min-h-screen">
    <h1 class="text-3xl font-semibold text-white mb-4">Help Center & FAQ</h1>
    <p class="text-gray-400 mb-6">
      Find answers to common questions and resources to help you navigate the platform.
    </p>

    <input
      type="text"
      placeholder="Search for help..."
      class="input input-bordered w-full mb-8"
      v-model="searchQuery"
    />

    <div>
      <div
        v-for="category in filteredCategories"
        :key="category.name"
        class="glass-card p-4 mb-6 rounded-lg"
      >
        <h2 class="text-xl font-medium text-white mb-3">{{ category.name }}</h2>

        <div v-for="(faq, j) in category.faqs" :key="j" class="mb-3">
          <button
            @click="toggleFAQ(category.name, j)"
            class="w-full text-left transition-colors duration-200 font-medium hover:text-white"
            :style="{ color: '#ac0e28' }"
          >
            {{ faq.question }}
          </button>

          <div v-if="faq.open" class="mt-2 text-gray-400 text-sm">
            {{ faq.answer }}
          </div>
        </div>
      </div>

      <p v-if="filteredCategories.length === 0" class="text-gray-400 text-center mt-10">
        No FAQs matched your search.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const categories = ref([
  {
    name: 'Smart Contact Scoring',
    faqs: [
      {
        question: 'How does Smart Contact Scoring work?',
        answer:
          'Our AI evaluates lead interactions, including emails and website visits, to assign engagement-based scores, helping prioritize high-potential prospects for improved conversion rates.',
        open: false,
      },
    ],
  },
  {
    name: 'CRM',
    faqs: [
      {
        question: 'Can I integrate the CRM with other tools?',
        answer:
          'Yes, our platform logically integrates with tools like Slack, Google Workspace, and others, ensuring smooth workflows and enhanced productivity across your business systems.',
        open: false,
      },
    ],
  },
  {
    name: 'Training',
    faqs: [
      {
        question: 'Is training required to use the platform?',
        answer:
          'No extensive training is needed. Our intuitive interface, combined with AI-driven guidance, ensures quick onboarding and ease of use for all team members.',
        open: false,
      },
    ],
  },
  {
    name: 'Support',
    faqs: [
      {
        question: 'What kind of support is available?',
        answer:
          'We provide 24/7 email support for all plans. Pro and Enterprise users also receive priority phone support for faster resolution of critical issues.',
        open: false,
      },
    ],
  },
])

const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value

  return categories.value
    .map(category => ({
      name: category.name,
      faqs: category.faqs
        .map(faq => ({
          ...faq,
          visible: faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()),
        }))
        .filter(faq => faq.visible),
    }))
    .filter(category => category.faqs.length > 0)
})

const toggleFAQ = (categoryName: string, faqIndex: number) => {
  const category = categories.value.find(cat => cat.name === categoryName)
  if (category) {
    category.faqs[faqIndex].open = !category.faqs[faqIndex].open
  }
}
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.input {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  transition: border-color 0.3s;
}
.input::placeholder {
  color: #bbb;
}
.input:focus {
  outline: none;
  border-color: #ac0e28;
  background: rgba(255, 255, 255, 0.25);
}
</style>
