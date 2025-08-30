import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const message = ref('');
  const type = ref('info');
  const trigger = ref(0);

  function showToast(msg, toastType = 'info') {
    message.value = msg;
    type.value = toastType;
    trigger.value++;
    console.log('Toast triggered:', msg, toastType);
  }

  return { message, type, trigger, showToast };
});
