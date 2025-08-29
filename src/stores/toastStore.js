// src/stores/toastStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const message = ref('');
  const type = ref('info');
  const trigger = ref(false);

  function showToast(msg, toastType = 'info') {
    message.value = msg;
    type.value = toastType;
    trigger.value = !trigger.value;
  }

  return {
    message,
    type,
    trigger,
    showToast,
  };
});
