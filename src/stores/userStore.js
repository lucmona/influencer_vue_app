// stores/userStore.js
import { defineStore } from 'pinia'
import { fetchUserDataApi } from './actions/useraction'

export const useUserStore = defineStore('user', {
  state: () => ({
    point_transactions: [],
    total_points: null,
    current_badget: {},
    badget_list:  [],
    userData: {},
    order_points:  [],
    error: null,
    loading: false,
  }),

  actions: {
    // setUserInfoFromUrl({ phone, dealerId }) {
    //   this.phone = phone
    //   this.dealerId = dealerId
    // },

    logoutUser() {
      this.userData = null
      this.loading = false
      this.error = null
    },

    async fetchUserData(phone) {
      this.loading = true
      this.error = null
      try {
        const res = await fetchUserDataApi(phone)
        this.userData = res.data
        this.point_transactions = res.point_transactions
        this.total_points = res.total_points
        this.current_badget = res.current_badget
        this.badget_list = res.badget_list
        this.order_points = res.order_points
        this.loading = false
      } catch (err) {
        this.loading = false
        this.error = err
        console.error('fetchUserData failed:', err)
      }
    }
  }
})
