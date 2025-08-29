// src/stores/authStore.js
import { defineStore } from "pinia";
import { requestOtp, verifyOtp } from "./actions/authaction";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    error: null,
  }),

  actions: {
    async sendOtp(phone) {
      this.loading = true;
      this.error = null;
      try {
        const res = await requestOtp(phone);
        console.log(res);
        return res; // API response (e.g. { success: true })
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async verifyOtp(phone, otp) {
      this.loading = true;
      this.error = null;
      try {
        const res = await verifyOtp(phone, otp);
        console.log(res);
        if (res.success && res.data.token) {
          this.user = res.data.user_details;
          this.token = res.data.token;
          this.isAuthenticated = true;

          localStorage.setItem("user", JSON.stringify(res.data.user_details));
          localStorage.setItem("token", res.data.token);
        }
        return res;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});
