<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { useProductStore } from '../stores/productStore';
import { useAuthStore } from '@/stores/authStore';
import Loyalty from '../components/Loyality.vue';

const route = useRoute();
const loaded = ref(false);

const userStore = useUserStore();
const productStore = useProductStore();
const authStore = useAuthStore();

onMounted(async () => {
  const phone = authStore.user.phone_number__c;

  console.log(phone);

  if (phone) {
    //userStore.setUserInfoFromUrl({ phone, dealerId });
    try {
      await Promise.all([
        userStore.fetchUserData(phone),
        productStore.fetchPriveProducts()
      ]);
      loaded.value = true;
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  }
});
</script>

<template>
  <div class="flex justify-center">
    <div class="md:w-[65vw] w-full">
      <div v-if="!loaded" class="text-center mt-10">Loading...</div>
      <Loyalty />
    </div>
  </div>
</template>
