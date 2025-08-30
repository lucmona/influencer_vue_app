<template>
  <div
    v-if="visible"
    class="fixed top-5 right-5 z-50 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300"
    :class="[ visible ? 'opacity-100' : 'opacity-0', bgColor ]"
  >
    {{ toast.message }}
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useToastStore } from '@/stores/toastStore';

const toast = useToastStore();
const visible = ref(false);

watch(
  () => toast.trigger,
  () => {
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, 3000);
  }
);

const bgColor = computed(() => {
  switch (toast.type) {
    case 'success': return 'bg-green-600';
    case 'error': return 'bg-red-600';
    case 'warning': return 'bg-yellow-500';
    default: return 'bg-blue-600';
  }
});
</script>
