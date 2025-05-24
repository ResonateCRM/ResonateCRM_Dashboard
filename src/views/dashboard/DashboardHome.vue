<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StatCard from '../../components/dashboard/StatCard.vue'
import ContactScoreCard from '../../components/dashboard/ContactScoreCard.vue'
import RecentActivities from '../../components/dashboard/RecentActivities.vue'
import PerformanceChart from '../../components/dashboard/PerformanceChart.vue'
import PipelineOverview from '../../components/dashboard/PipelineOverview.vue'

const isLoading = ref(true)

onMounted(() => {
  // Simulate data loading
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-white">Welcome to your AI-driven CRM</h1>
      <p class="text-gray-400">Your sales performance at a glance, enhanced with AI insights</p>
    </div>
    
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
    
    <div v-else>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Leads"
          value="254"
          change="+12%"
          positive
          icon="users"
        />
        <StatCard
          title="Open Deals"
          value="42"
          change="+5%"
          positive
          icon="dollar"
        />
        <StatCard
          title="Conversion Rate"
          value="24.8%"
          change="-2%"
          :positive="false"
          icon="chart"
        />
        <StatCard
          title="Revenue"
          value="$187K"
          change="+18%"
          positive
          icon="money"
        />
      </div>
      
      <!-- Main Dashboard Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <!-- Performance Chart -->
          <div class="glass-card p-6">
            <h2 class="text-lg font-semibold text-white mb-4">Performance Trends</h2>
            <PerformanceChart />
          </div>
          
          <!-- Pipeline Overview -->
          <div class="glass-card p-6">
            <h2 class="text-lg font-semibold text-white mb-4">Pipeline Overview</h2>
            <PipelineOverview />
          </div>
        </div>
        
        <div class="space-y-6">
          <!-- Top Scoring Contacts -->
          <div class="glass-card p-6">
            <h2 class="text-lg font-semibold text-white mb-4">Top Scoring Contacts</h2>
            <div class="space-y-4">
              <ContactScoreCard
                name="Emily Johnson"
                company="TechCorp"
                score="92"
                avatar="https://i.pravatar.cc/150?img=32"
              />
              <ContactScoreCard
                name="Michael Chen"
                company="InnovateSoft"
                score="89"
                avatar="https://i.pravatar.cc/150?img=11"
              />
              <ContactScoreCard
                name="Sarah Williams"
                company="DataSphere"
                score="87"
                avatar="https://i.pravatar.cc/150?img=48"
              />
              <ContactScoreCard
                name="David Kim"
                company="NexGen Solutions"
                score="83"
                avatar="https://i.pravatar.cc/150?img=67"
              />
            </div>
          </div>
          
          <!-- Recent Activities -->
          <div class="glass-card p-6">
            <h2 class="text-lg font-semibold text-white mb-4">Recent Activities</h2>
            <RecentActivities />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>