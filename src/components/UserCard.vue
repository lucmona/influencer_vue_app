<template>
  <div class="bg-gradient-to-tr from-blue-500 to-blue-200 p-5">
    <div class="flex items-center gap-x-4 text-white">
      <div><FaRegUserCircle class="h-10 w-10" /></div>
      <div>
        <div class="text-sm">WELCOME BACK</div>
        <div class="text-xl font-bold">{{ userData?.influencer_name }}</div>
      </div>
    </div>

    <div class="bg-slate-300/50 p-3 mt-3 rounded-lg">
      <div class="font-bold">
        <em>Unipro prive</em>
      </div>

      <div class="flex justify-between mt-5">
        <div>
          <div class="flex items-center gap-x-2">
            <div><MdStars class="h-5 w-5 text-white" /></div>
            <div class="text-lg font-bold">{{ userData?.total_points }}</div>
          </div>
          <div class="text-sm mb-3">Reward Points</div>
        </div>

        <div>
          <div class="flex items-center gap-x-2">
            <div><MdStars class="h-5 w-5 text-white" /></div>
            <div class="text-lg font-bold">{{ userData?.available_points }}</div>
          </div>
          <div class="text-sm">Available Points</div>
        </div>
      </div>

      <div class="mt-5 flex items-center justify-between">
        <div class="font-bold">Prive Member</div>
        <div class="text-sm">{{ formatSinceDate(userData?.joining_date) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/userStore'; // update path as needed
import { FaRegUserCircle } from 'vue3-icons/fa';
import { MdStars } from 'vue3-icons/md';

const userStore = useUserStore();
const userData = computed(() => userStore.userData);

function formatSinceDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short' };
  return `Since ${new Intl.DateTimeFormat('en-US', options).format(date)}`;
}
</script>
