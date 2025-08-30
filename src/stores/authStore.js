// src/stores/authStore.js
import { defineStore } from "pinia";
import { requestOtp, verifyOtp } from "./actions/authaction";
import { useToastStore } from "./toastStore";

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
      const toast = useToastStore();
      this.loading = true;
      this.error = null;

      try {
        const res = await requestOtp(phone);
        console.log(res);
         toast.showToast("OTP sent successfully!", "success");
        if (res.success) {
          toast.showToast("OTP sent successfully!", "success");
        } else {
          toast.showToast(res.message || "Failed to send OTP", "error");
        }
        return res;
      } catch (err) {
        this.error = err.message;
        toast.showToast("Error sending OTP: " + err.message, "error");
      } finally {
        this.loading = false;
      }
    },

    async verifyOtp(phone, otp) {
      const toast = useToastStore();
      this.loading = true;
      this.error = null;

      try {
        const res = await verifyOtp(phone, otp);
        if (res.success && res.data.token) {
          this.user = res.data.user_details;
          this.token = res.data.token;
          this.isAuthenticated = true;

          localStorage.setItem("user", JSON.stringify(res.data.user_details));
          localStorage.setItem("token", res.data.token);

          toast.showToast("Login successful!", "success");
        } else {
          toast.showToast(res.message || "Invalid OTP", "error");
        }
        return res;
      } catch (err) {
        this.error = err.message;
        toast.showToast("Error verifying OTP: " + err.message, "error");
      } finally {
        this.loading = false;
      }
    },

    logout() {
      const toast = useToastStore();
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.showToast("Logged out successfully!", "info");
    },
  },
});
