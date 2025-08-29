<template>
  <div class="w-full p-3 rounded-xl shadow-md border border-gray-200 bg-white">
    <h2 class="font-semibold text-gray-800 text-base mb-1">Your Prive Journey</h2>
    <p class="text-sm text-gray-500 mb-5">
      <span v-if="nextLevel">
        Shop for {{ remaining }} Points more to upgrade to Prive {{ nextLevel.name }}
      </span>
      <span v-else>You have reached the highest level 🎉</span>
    </p>

    <!-- Progress Bar -->
    <div class="relative h-2 rounded-full bg-gray-200 mb-10 mt-20 mr-3">
      <div
        class="absolute h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-200"
        :style="{ width: progressPercent + '%' }"
      ></div>

      <!-- Circles -->
      <div
        v-for="(level, index) in budget"
        :key="level.name"
        class="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
        :style="{ left: `calc(${(level.points / maxPoints) * 100}% - 12px)` }"
      >
        <div
          :class="[
            'w-6 h-6 rounded-full border-2 flex items-center justify-center',
            currentPoints >= level.points ? 'bg-blue-500 border-blue-900 text-white' : 'bg-white border-gray-300 text-transparent',
            index === currentIndex ? 'ring-2 ring-blue-100' : ''
          ]"
        >
          <svg
            v-if="currentPoints >= level.points"
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <!-- You're here label -->
        <div
          v-if="index === currentIndex"
          class="absolute -top-8 bg-gradient-to-r from-blue-500 to-blue-200 text-white text-[10px] px-2 py-[2px] rounded-full font-semibold shadow-sm w-20 text-center"
        >
          YOU’RE HERE
        </div>
      </div>
    </div>

    <!-- Labels -->
    <div class="flex justify-around">
      <div v-for="level in budget" :key="level.name" class="text-center">
        <div class="text-sm font-semibold text-gray-800">{{ level.name }}</div>
        <div class="flex items-center gap-x-1 mt-2">
          <MdStars class="h-5 w-5" />
          <div class="text-xs text-gray-500 font-bold">{{ level.points.toLocaleString() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/userStore'; // adjust path
import { MdStars } from 'vue3-icons/md';

const userStore = useUserStore();

const currentPoints = computed(() => userStore.total_points);
const budget = computed(() => userStore.badget_list || []);

const maxPoints = computed(() => budget.value.at(-1)?.points || 1);

const currentIndex = computed(() => {
  return budget.value.findIndex((level, index) => {
    const next = budget.value[index + 1];
    return currentPoints.value < (next?.points ?? Infinity);
  });
});

const nextLevel = computed(() => budget.value[currentIndex.value + 1]);

const remaining = computed(() =>
  nextLevel.value ? nextLevel.value.points - currentPoints.value : 0
);

const progressPercent = computed(() =>
  Math.min((currentPoints.value / maxPoints.value) * 100, 100)
);
</script>
