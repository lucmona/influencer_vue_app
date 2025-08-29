<template>
  <div class="w-full text-center py-6 mt-10 px-2">
    <h2 class="text-xl font-semibold text-gray-800 mb-6">Your Prive Benefits</h2>

    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="(benefit, index) in benefits"
        :key="index"
        class="p-4 rounded-xl shadow-lg border border-gray-200"
      >
        <div>
          <div class="text-3xl mb-3">{{ benefit.icon }}</div>
          <p class="text-sm font-medium text-gray-800">{{ benefit.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const benefits = [
  {
    title: 'Reward points with every order',
    icon: '🎯',
  },
  {
    title: 'Exclusive surprise offers & coupons',
    icon: '🎁',
  },
];
</script>
