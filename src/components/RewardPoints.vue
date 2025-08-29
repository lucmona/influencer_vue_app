<template>
  <div class="w-full mx-auto px-4 py-6 space-y-6 text-sm">
    <!-- Earn Ways -->
    <div>
      <h2 class="text-lg font-semibold mb-2">How to earn points</h2>

      <div
        v-for="(way, index) in earnWays"
        :key="index"
        class="border rounded-lg p-3 mb-3 shadow-sm"
      >
        <button
          class="flex justify-between items-center w-full"
          @click="toggleOpen(index)"
        >
          <div class="flex items-center gap-2 font-medium text-blue-500">
            🎁 {{ way.title }}
          </div>
          <component :is="openIndex === index ? FaChevronUp : FaChevronDown" />
        </button>
        <p v-if="openIndex === index" class="mt-2 text-gray-600">
          {{ way.description }}
        </p>
      </div>
    </div>

    <!-- Reward Points History -->
    <div>
      <h2 class="text-lg font-semibold mb-3">Your reward points history</h2>

      <div class="flex gap-x-5 mb-4">
        <button
          v-for="label in ['Earned', 'Redeemed']"
          :key="label"
          :class="[
            'px-4 py-1 rounded-full border w-full',
            tab === label ? 'bg-blue-100 text-blue-500 font-semibold' : 'text-gray-600'
          ]"
          @click="tab = label"
        >
          {{ label }}
        </button>
      </div>

      <div class="space-y-4">
        <template v-if="tab === 'Redeemed'">
          <template v-for="(item, idx) in visibleUsedHistory" :key="idx">
            <div>
              <div class="flex items-center justify-between mb-2">
                <p class="text-gray-600 text-xs bg-slate-200 w-fit py-1 px-2 rounded-2xl">
                  {{ formatDate(item.created_at) }}
                </p>
                <p v-if="item.status === 'Placed'" class="text-white text-xs bg-green-300 w-fit py-1 px-2 rounded-2xl">
                  Redeemed
                </p>
              </div>
              <div class="flex justify-between items-center border-b pb-2">
                <div>
                  <div class="flex gap-x-2 items-center mb-2">
                    <div class="h-16 w-20 bg-slate-300 border">
                      <img :src="item.product_image_url" class="h-full w-full" />
                    </div>
                    <div>
                      <p class="text-gray-500 text-xs">{{ item.product_name }}</p>
                      <p class="text-gray-500 text-xs">Qty: {{ item.quantity }}</p>
                      <p class="text-gray-500 text-xs">{{ item.points_used }} pts</p>
                    </div>
                  </div>
                </div>
                <p class="font-semibold text-red-500">
                  {{ item.total_points }}
                </p>
              </div>
            </div>
          </template>

          <div v-if="usedPointsHistory.length > 5" class="text-center mt-3">
            <button
              class="text-sm text-white px-3 py-2 rounded-full font-medium bg-blue-500"
              @click="showAllUsed = !showAllUsed"
            >
              {{ showAllUsed ? 'Show Less' : 'Show More' }}
            </button>
          </div>
        </template>

        <template v-else>
          <template v-for="(item, idx) in visibleEarnedHistory" :key="idx">
            <div class="flex justify-between border-b pb-2">
              <div>
                <p class="text-gray-500 text-xs">{{ formatDate(item.date) }}</p>
              </div>
              <p class="font-semibold text-green-600">
                {{ item.points_earned }}
              </p>
            </div>
          </template>

          <div v-if="earnedPointsHistory.length > 5" class="text-center mt-3">
            <button
              class="text-sm text-white px-3 py-2 rounded-full font-medium bg-blue-500"
              @click="showAllEarned = !showAllEarned"
            >
              {{ showAllEarned ? 'Show Less' : 'Show More' }}
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { FaChevronDown, FaChevronUp } from 'vue3-icons/fa';

const earnWays = [
  {
    title: 'Shop',
    description: 'Earn points every time you shop from registered welspun distributor',
  },
  {
    title: 'Birthday Multiplier',
    description: 'Shop in your birthday month and get 1.5x multiplier on reward points',
  },
];

const openIndex = ref(null);
const tab = ref('Redeemed');
const showAllEarned = ref(false);
const showAllUsed = ref(false);

const userStore = useUserStore();
const earnedPointsHistory = computed(() => userStore.point_transactions || []);
const usedPointsHistory = computed(() => userStore.order_points || []);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Intl.DateTimeFormat('en-GB', options).format(date);
};

const visibleEarnedHistory = computed(() => {
  const reversed = [...earnedPointsHistory.value].reverse();
  return showAllEarned.value ? reversed : reversed.slice(0, 5);
});

const visibleUsedHistory = computed(() => {
  const reversed = [...usedPointsHistory.value].reverse();
  return showAllUsed.value ? reversed : reversed.slice(0, 5);
});

const toggleOpen = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>
