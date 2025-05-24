<script setup lang="ts">
import { ref } from 'vue'

// Email template categories
const templateCategories = [
  { id: 'follow-up', name: 'Follow-Up' },
  { id: 'outreach', name: 'Initial Outreach' },
  { id: 'proposal', name: 'Proposal' },
  { id: 'meeting', name: 'Meeting Request' },
  { id: 'thank-you', name: 'Thank You' }
]

// Email templates
const emailTemplates = [
  {
    id: 1,
    category: 'follow-up',
    title: 'Post-Demo Follow-Up',
    content: `Dear {name},

Thank you for taking the time to join our product demonstration today. I hope you found our discussion about {product_feature} valuable.

Based on our conversation, I believe the following features would be most beneficial for {company}:

1. {feature_1}
2. {feature_2}
3. {feature_3}

I've attached additional resources on these features for your review. Would you be available for a follow-up call next week to discuss any questions you might have?

Best regards,
{sender_name}`
  },
  {
    id: 2,
    category: 'outreach',
    title: 'Initial Contact',
    content: `Hi {name},

I hope this email finds you well. My name is {sender_name} from {sender_company}, and we specialize in {product_category}.

I recently came across {company} and was impressed by your work in {industry}. I believe our {product_name} could help you {value_proposition}.

Would you be open to a brief 15-minute call to discuss how we might be able to help {company} achieve {goal}?

Looking forward to connecting,
{sender_name}`
  },
  {
    id: 3,
    category: 'proposal',
    title: 'Solution Proposal',
    content: `Dear {name},

Following our conversation about your challenges with {pain_point}, I'm pleased to present a customized solution for {company}.

Based on your requirements, I recommend our {product_tier} package, which includes:

- {feature_1}: {benefit_1}
- {feature_2}: {benefit_2}
- {feature_3}: {benefit_3}

The investment for this solution would be {price}, which includes onboarding and training for your team.

I've attached the full proposal for your review. Would you like to schedule a call to discuss the details?

Best regards,
{sender_name}`
  },
  {
    id: 4,
    category: 'meeting',
    title: 'Meeting Request',
    content: `Hi {name},

I hope you're doing well. I'd like to schedule a meeting to discuss {meeting_topic}.

Based on our previous conversation about {previous_topic}, I believe it would be valuable to explore how we can {value_proposition}.

Would any of these times work for you?
- {option_1}
- {option_2}
- {option_3}

Looking forward to our conversation.

Best,
{sender_name}`
  },
  {
    id: 5,
    category: 'thank-you',
    title: 'Thank You After Meeting',
    content: `Dear {name},

Thank you for taking the time to meet with me today. I appreciated learning more about {company}'s goals regarding {topic}.

As promised, I'm sharing the resources we discussed:

1. {resource_1}
2. {resource_2}

I'll follow up next week as we discussed to {next_steps}.

Best regards,
{sender_name}`
  }
]

// Contact list for recipient selection
const contacts = [
  { id: 1, name: 'Emily Johnson', email: 'emily.johnson@techcorp.com', company: 'TechCorp' },
  { id: 2, name: 'Michael Chen', email: 'michael.chen@innovatesoft.com', company: 'InnovateSoft' },
  { id: 3, name: 'Sarah Williams', email: 'sarah.williams@datasphere.com', company: 'DataSphere' },
  { id: 4, name: 'David Kim', email: 'david.kim@nexgen.com', company: 'NexGen Solutions' },
  { id: 5, name: 'Jessica Martinez', email: 'jessica.m@globaltech.com', company: 'Global Technologies' }
]

// Reactive state
const selectedCategory = ref('follow-up')
const selectedTemplate = ref(emailTemplates[0])
const selectedContact = ref<typeof contacts[number] | null>(null)
const emailSubject = ref('')
const emailContent = ref(selectedTemplate.value.content)
const customizationContext = ref('')
const isGeneratingEmail = ref(false)
const isPersonalizing = ref(false)

// Methods
const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
  const templatesInCategory = emailTemplates.filter(template => template.category === categoryId)
  if (templatesInCategory.length > 0) {
    selectedTemplate.value = templatesInCategory[0]
    emailContent.value = selectedTemplate.value.content
    emailSubject.value = ''
  }
}

const selectTemplate = (template: typeof emailTemplates[number]) => {
  selectedTemplate.value = template
  emailContent.value = template.content
  emailSubject.value = ''
}

// FIXED: accept null and handle it properly
const selectContact = (contact: typeof contacts[number] | null) => {
  selectedContact.value = contact
  emailSubject.value = ''
}

const generateSubject = () => {
  isGeneratingEmail.value = true
  setTimeout(() => {
    const company = selectedContact.value?.company || '[Company]'
    const name = selectedContact.value?.name?.split(' ')[0] || '[Name]'

    switch (selectedTemplate.value.category) {
      case 'follow-up':
        emailSubject.value = `Follow-up: Our conversation about ${company}'s needs`
        break
      case 'outreach':
        emailSubject.value = `Introducing a solution for ${company}'s challenges`
        break
      case 'proposal':
        emailSubject.value = `Proposal: Customized solution for ${company}`
        break
      case 'meeting':
        emailSubject.value = `Meeting request: Discussing next steps with ${company}`
        break
      case 'thank-you':
        emailSubject.value = `Thank you for your time, ${name}`
        break
      default:
        emailSubject.value = ''
    }
    isGeneratingEmail.value = false
  }, 1500)
}

const personalizeEmail = () => {
  if (!selectedContact.value) {
    alert('Please select a contact first.')
    return
  }

  isPersonalizing.value = true
  setTimeout(() => {
    let content = selectedTemplate.value.content
    const contact = selectedContact.value

    if (contact) {
      content = content.replace(/\{name\}/g, contact.name)
        .replace(/\{company\}/g, contact.company)
    }

    if (customizationContext.value) {
      if (selectedTemplate.value.category === 'follow-up') {
        content = content.replace(/\{product_feature\}/g, 'AI Email Assistant')
          .replace(/\{feature_1\}/g, 'Smart Contact Scoring')
          .replace(/\{feature_2\}/g, 'AI Email Templates')
          .replace(/\{feature_3\}/g, 'Meeting Summary Generator')
      } else if (selectedTemplate.value.category === 'outreach') {
        content = content.replace(/\{sender_name\}/g, 'John Doe')
          .replace(/\{sender_company\}/g, 'AI-CRM Solutions')
          .replace(/\{product_category\}/g, 'AI-driven sales tools')
          .replace(/\{industry\}/g, 'technology solutions')
          .replace(/\{product_name\}/g, 'AI-CRM Platform')
          .replace(/\{value_proposition\}/g, 'increase sales productivity by 35%')
          .replace(/\{goal\}/g, 'revenue growth targets')
      }

      const contextualOpening = `I noticed from your recent LinkedIn post about ${customizationContext.value} that this is a priority for your team. I thought you might be interested in how our solution addresses this specific challenge.\n\n`
      content = content.replace('I hope this email finds you well.', contextualOpening)
    }

    emailContent.value = content
    isPersonalizing.value = false
  }, 2000)
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-start p-8 bg-black text-white"
  >
    <div
      class="max-w-4xl w-full mt-12 p-8 bg-black/70 backdrop-blur-md rounded-3xl border border-[#ac0e28]/60 shadow-lg shadow-[#ac0e28]/40"
    >
      <h1 class="text-4xl font-extrabold mb-8 text-[#ac0e28] drop-shadow-lg">
        Email Templates
      </h1>

      <!-- Select Category -->
      <div class="mb-6">
        <label
          for="category-select"
          class="block mb-2 font-semibold tracking-wide text-[#ac0e28]"
          >Select Category:</label
        >
        <select
          id="category-select"
          v-model="selectedCategory"
          @change="selectCategory(selectedCategory)"
          class="w-full rounded-lg border border-[#ac0e28] bg-black/80 py-3 px-4 text-white font-medium
                 focus:outline-none focus:ring-4 focus:ring-[#ac0e28]/70 transition"
        >
          <option
            v-for="cat in templateCategories"
            :key="cat.id"
            :value="cat.id"
            class="text-white bg-black"
          >
            {{ cat.name }}
          </option>
        </select>
      </div>

      <!-- Select Template -->
      <div class="mb-6">
        <label
          for="template-select"
          class="block mb-2 font-semibold tracking-wide text-[#ac0e28]"
          >Select Template:</label
        >
        <select
          id="template-select"
          v-model="selectedTemplate"
          @change="selectTemplate(selectedTemplate)"
          class="w-full rounded-lg border border-[#ac0e28] bg-black/80 py-3 px-4 text-white font-medium
                 focus:outline-none focus:ring-4 focus:ring-[#ac0e28]/70 transition"
        >
          <option
            v-for="template in emailTemplates.filter(t => t.category === selectedCategory)"
            :key="template.id"
            :value="template"
            class="text-white bg-black"
          >
            {{ template.title }}
          </option>
        </select>
      </div>

      <!-- Select Contact -->
      <div class="mb-6">
        <label
          for="contact-select"
          class="block mb-2 font-semibold tracking-wide text-[#ac0e28]"
          >Select Contact:</label
        >
        <select
          id="contact-select"
          v-model="selectedContact"
          @change="selectContact(selectedContact)"
          class="w-full rounded-lg border border-[#ac0e28] bg-black/80 py-3 px-4 text-white font-medium
                 focus:outline-none focus:ring-4 focus:ring-[#ac0e28]/70 transition"
        >
          <option disabled value="" class="text-gray-400">-- Select Contact --</option>
          <option
            v-for="contact in contacts"
            :key="contact.id"
            :value="contact"
            class="text-white bg-black"
          >
            {{ contact.name }} - {{ contact.company }}
          </option>
        </select>
      </div>

      <!-- Customization Context -->
      <div class="mb-6">
        <label
          for="context-input"
          class="block mb-2 font-semibold tracking-wide text-[#ac0e28]"
          >Add Context for Personalization (optional):</label
        >
        <input
          id="context-input"
          type="text"
          v-model="customizationContext"
          placeholder="e.g. new product launch, recent funding, industry trend"
          class="w-full rounded-lg border border-[#ac0e28] bg-black/80 py-3 px-4 text-white font-medium
                 focus:outline-none focus:ring-4 focus:ring-[#ac0e28]/70 transition"
        />
      </div>

      <!-- Generate Subject Button -->
      <button
        @click="generateSubject"
        :disabled="isGeneratingEmail"
        class="w-full bg-[#ac0e28] hover:bg-[#8b081f] py-3 rounded-lg font-semibold
               transition disabled:opacity-60 disabled:cursor-not-allowed mb-4"
      >
        {{ isGeneratingEmail ? 'Generating Subject...' : 'Generate Subject' }}
      </button>

      <!-- Personalize Email Button -->
      <button
        @click="personalizeEmail"
        :disabled="isPersonalizing"
        class="w-full bg-[#ac0e28] hover:bg-[#8b081f] py-3 rounded-lg font-semibold
               transition disabled:opacity-60 disabled:cursor-not-allowed mb-6"
      >
        {{ isPersonalizing ? 'Personalizing Email...' : 'Personalize Email' }}
      </button>

      <!-- Email Subject -->
      <div class="mb-4">
        <label class="block mb-2 font-semibold text-[#ac0e28]">Email Subject:</label>
        <input
          type="text"
          v-model="emailSubject"
          readonly
          class="w-full rounded-lg border border-[#ac0e28] bg-black/80 py-3 px-4 text-white font-medium"
        />
      </div>

      <!-- Email Content -->
      <div class="mb-6">
        <label class="block mb-2 font-semibold text-[#ac0e28]">Email Content:</label>
        <textarea
          rows="14"
          v-model="emailContent"
          class="w-full rounded-lg border border-[#ac0e28] bg-black/80 py-3 px-4 text-white font-medium resize-none"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
