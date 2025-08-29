<template>
  <div class="w-full mt-10 relative">
    <!-- Carousel -->
    <Carousel
      v-model="currentSlide"
      :items-to-show="2"
      :wrap-around="true"
      :mouse-drag="true"
      :snapAlign="'center'"
      :breakpoints="{
        320: { itemsToShow: 1, snapAlign: 'center' },
        640: { itemsToShow: 1.2, snapAlign: 'center' },
        768: { itemsToShow: 1.5, snapAlign: 'center' },
        1024: { itemsToShow: 2, snapAlign: 'center' },
        1280: { itemsToShow: 2.5, snapAlign: 'center' },
      }"
    >
      <Slide
        v-for="(card, i) in cards"
        :key="i"
        class="transition-transform duration-300 md:px-2 px-3 py-10"
      >
        <div
          class="rounded-xl shadow-md overflow-hidden flex flex-col transition-transform duration-300 h-[600px]"
          :class="currentSlide === i ? 'scale-105 shadow-2xl z-10' : 'scale-95 opacity-80'"
          :style="{
            borderColor: card.color.border,
            background: `linear-gradient(to bottom, ${card.color.bgFrom}, ${card.color.bgTo})`,
          }"
        >
          <!-- Title -->
          <div
            class="px-4 py-2 text-white font-semibold text-center text-sm"
            :style="{ backgroundColor: card.color.badge }"
          >
            {{ card.title }}
          </div>

          <!-- Products -->
          <div class="flex flex-col flex-grow overflow-hidden">
            <div
              class="grid grid-cols-2 gap-2 p-4 text-sm text-gray-800 overflow-y-auto flex-grow-0 bg-white"
              :style="{ maxHeight: card.unlock ? '380px' : '450px' }"
            >
              <div
                v-for="(item, idx) in card.products"
                :key="idx"
                :class="[
                  'flex flex-col items-center gap-1 text-center cursor-pointer rounded-md border-2 py-2 px-2',
                  selectedProducts.some((p) => p.product_id === item.id)
                    ? 'border-blue-400 bg-blue-100 shadow-lg'
                    : 'border-gray-300',
                ]"
                @click="isEligible(card.type) && toggleSelect(item)"
              >
                <div class="w-full h-[80px]">
                  <img :src="item.image_url" :alt="item.name" class="h-full w-full object-cover rounded-md" />
                </div>
                <p class="font-semibold text-xs">{{ item.name }}</p>
                <p class="text-xs text-gray-600">{{ item.points }} pts</p>
              </div>
            </div>

            <!-- Footer -->
            <div class="bg-white border-t mt-auto">
              <div v-if="card.unlock" class="px-4 py-3 text-sm">
                <p class="font-medium text-gray-800 mb-2">Unlock More with {{ card.unlock.title }}</p>
                <ul class="space-y-2 text-gray-700">
                  <li v-for="(item, i) in card.unlock.items" :key="i" class="flex items-start gap-2">
                    <Icon name="fa-check-circle" class="text-yellow-500 mt-1" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <div v-if="isEligible(card.type)" class="flex justify-center mb-4 px-4">
                <button
                  :disabled="selectedProducts.length === 0"
                  @click="showModal = true"
                  class="mt-2 px-6 py-2 rounded-full w-full font-semibold text-white transition-colors"
                  :class="selectedProducts.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'"
                >
                  Redeem ({{ selectedProducts.length }})
                </button>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </Carousel>

    <!-- Modal -->
    <ConfirmRedeemModal
      :visible="showModal"
      :products="selectedProducts"
      :onConfirm="confirmRedeem"
      :onCancel="() => (showModal = false)"
      :hasEnoughPoints="hasEnoughPoints"
      :totalSelectedPoints="totalSelectedPoints"
      :handleQuantityChange="handleQuantityChange"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

import Icon from 'vue3-icons'
import ConfirmRedeemModal from './ConfirmRedeemModal.vue'
import { useUserStore } from '@/stores/userStore'
import { useProductStore } from '@/stores/productStore'
import { redeemPointsApi } from '../stores/actions/reedemaction'

const showModal = ref(false)
const selectedProducts = ref([])

const userStore = useUserStore()
const productStore = useProductStore()

const cards = computed(() => productStore.products)
const userPoints = computed(() => userStore.userData.total_points)
const availablePoints = computed(() => userStore.userData.available_points)
const userId = computed(() => userStore.userData.influencer_acc_id)
const phone = computed(() => userStore.phone)

const getEligibleCardType = (points) => {
  if (points >= 10000) return 'Platinum'
  if (points >= 5000) return 'Gold'
  return 'Silver'
}

const currentSlide = ref(
  cards.value.findIndex(
    (card) => getEligibleCardType(userStore.userData.total_points) === card.type
  )
)

const toggleSelect = (item) => {
  const existing = selectedProducts.value.find((p) => p.product_id === item.id)
  if (existing) {
    selectedProducts.value = selectedProducts.value.filter((p) => p.product_id !== item.id)
  } else {
    selectedProducts.value.push({
      product_id: item.id,
      product_name: item.name,
      points: item.points,
      quantity: 1,
    })
  }
}

const handleQuantityChange = (productId, delta) => {
  selectedProducts.value = selectedProducts.value.map((p) =>
    p.product_id === productId ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p
  )
}

const totalSelectedPoints = computed(() =>
  selectedProducts.value.reduce((sum, p) => sum + p.points * p.quantity, 0)
)
const hasEnoughPoints = computed(() => availablePoints.value >= totalSelectedPoints.value)

const isEligible = (type) => getEligibleCardType(userPoints.value) === type

const confirmRedeem = async () => {
  await redeemPointsApi({
    selectedProducts: selectedProducts.value,
    userId: userId.value,
  })
  showModal.value = false
  selectedProducts.value = []

  setTimeout(() => {
    userStore.fetchUserData(phone.value)
  }, 5000)
}
</script>
