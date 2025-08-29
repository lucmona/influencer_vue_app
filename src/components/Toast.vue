<template>
  <div
    v-if="visible"
    class="fixed top-5 right-5 z-50 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300"
    :class="[
      visible ? 'opacity-100' : 'opacity-0',
      bgColor,
    ]"
  >
    {{ message }}
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  message: String,
  type: {
    type: String,
    default: 'info',
  },
  duration: {
    type: Number,
    default: 3000,
  },
});

const visible = ref(true);

watch(
  () => props.message,
  () => {
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, props.duration);
  },
  { immediate: true }
);

const bgColor = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-600';
    case 'error':
      return 'bg-red-600';
    case 'warning':
      return 'bg-yellow-500';
    case 'info':
    default:
      return 'bg-blue-600';
  }
});
</script>
