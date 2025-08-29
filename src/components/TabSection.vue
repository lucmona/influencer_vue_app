<template>
  <div class="w-full mx-auto mt-10">
    <!-- Tabs -->
    <div class="flex justify-between border-b border-pink-100">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="flex-1 text-sm py-2 px-2 flex justify-center items-center font-medium text-gray-700 transition-all"
        :class="activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-600' : ''"
      >
        {{ tab.label }}
        <component :is="tab.icon" class="text-blue-500 ml-1" />
      </button>
    </div>

    <!-- Tab Content -->
    <div class="mt-4 px-2">
      <PriveJourney v-if="activeTab === 'prive'" />
      <RewardPoints v-else-if="activeTab === 'rewards'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FaCrown, FaGift } from 'vue3-icons/fa';
import PriveJourney from './PriveJourney.vue';
import RewardPoints from './RewardPoints.vue';

const activeTab = ref('prive');

const tabs = [
  {
    id: 'prive',
    label: 'Prive Member',
    icon: FaCrown,
  },
  {
    id: 'rewards',
    label: 'Reward Points',
    icon: FaGift,
  },
];
</script>
