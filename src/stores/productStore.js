import { defineStore } from 'pinia'
import { fetchPriveProductsApi } from './actions/productaction'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    error: null,
    loading: null,
  }),

  actions: {
    async fetchPriveProducts() {
      this.loading = true
      this.error = null
      try {
        const res = await fetchPriveProductsApi()
        this.products = res.data
        this.loading = false
      } catch (err) {
        this.loading = false
        this.error = err
        console.error('fetchPriveProducts failed:', err)
      }
    },
  },
})
