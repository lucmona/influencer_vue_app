<template>
  <div v-if="visible" class="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg max-w-lg w-full p-6 mx-4">
      <h2 class="text-xl font-bold mb-4">Confirm Redeem</h2>
      <p class="mb-4">You are about to redeem the following products:</p>

      <ul class="space-y-3 mb-4">
        <li
          v-for="(item, idx) in products"
          :key="item.product_id"
          class="flex justify-between items-center border p-2"
        >
          <div>
            <p>{{ item.product_name }}</p>
            <p class="text-sm text-gray-600">
              {{ item.points }} pts × {{ item.quantity }} = {{ item.points * item.quantity }} pts
            </p>
          </div>
          <div class="flex items-center">
            <button
              class="px-2 py-1 text-lg"
              @click="handleQuantityChange(item.product_id, -1)"
            >
              −
            </button>
            <span class="mx-2">{{ item.quantity }}</span>
            <button
              class="px-2 py-1 text-lg"
              @click="handleQuantityChange(item.product_id, 1)"
            >
              +
            </button>
          </div>
        </li>
      </ul>

      <p class="font-semibold">Total: {{ totalSelectedPoints }} points</p>

      <p v-if="!hasEnoughPoints" class="text-red-500 my-2">
        You don’t have enough points to redeem all these products.
      </p>

      <div class="flex justify-end gap-4">
        <button
          @click="onCancel"
          class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          :disabled="!hasEnoughPoints"
          @click="onConfirm"
          class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
  products: Array,
  onConfirm: Function,
  onCancel: Function,
  totalSelectedPoints: Number,
  handleQuantityChange: Function,
  hasEnoughPoints: Boolean
});
</script>
