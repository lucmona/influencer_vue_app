<template>
  <div class="w-full p-3 mx-auto mt-10">
    <h2 class="text-xl font-semibold mb-4">FAQS</h2>
    <div
      v-for="(faq, i) in data"
      :key="i"
      class="border-b py-3"
    >
      <button
        @click="toggle(i)"
        class="flex justify-between items-center w-full text-left"
      >
        <span class="text-base font-medium text-gray-800">
          {{ faq.question }}
        </span>
        <component
          :is="openIndex === i ? FaChevronUp : FaChevronDown"
          class="text-gray-500"
        />
      </button>
      <p
        v-if="openIndex === i"
        class="text-sm text-gray-600 mt-2"
      >
        {{ faq.answer }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FaChevronUp, FaChevronDown } from 'vue3-icons/fa';

defineProps({
  data: {
    type: Array,
    required: true
  }
});

const openIndex = ref(null);

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index;
}
</script>
