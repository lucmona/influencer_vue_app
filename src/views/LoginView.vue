<template>
  <div class="flex">
    <div class="md:flex-1/2 flex-0 flex bg-blue-500 justify-center items-center">
        <img :src="loginImage" alt="Logo" class="max-h-[90vh] w-full" />
    </div>
    <div class="md:flex-1/2 flex-1 flex items-center justify-center min-h-screen bg-gray-100 p-3">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
      <div class="flex justify-center mb-10">
        <img :src="login" alt="Logo" class="h-[80%] w-[80%]" />
      </div>
      <div>
      <!-- Step 1: Input Email/Phone -->
      <div v-if="step === 'input'">
        <h2 class="text-2xl font-bold mb-4">Welcome back</h2>
        <p class="text-gray-600 mb-4">
          Enter your mobile number to receive a one-time passcode.
        </p>

        <input
          v-model="phone"
          type="text"
          placeholder="Enter mobile number"
          class="w-full px-4 py-2 border rounded-lg mb-4"
        />

        <button
          @click="handleRequestOtp"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {{ loading ? "Sending..." : "Send Code" }}
        </button>
      </div>

      <!-- Step 2: Enter OTP -->
      <div v-else>
        <h2 class="text-2xl font-bold mb-4">Enter code</h2>
        <p class="text-gray-600 mb-4">
          We sent a code to <strong>{{ phone }}</strong>.
        </p>

        <div class="flex justify-between space-x-2 mb-4">
          <input
            v-for="(digit, index) in otpDigits"
            :key="index"
            v-model="otp[index]"
            maxlength="1"
            class="w-12 h-12 text-center border rounded-lg text-xl"
            @input="focusNext(index)"
          />
        </div>

        <p class="text-sm text-gray-500 mb-4">
          Didn’t get a code?
          <button
            @click="handleResendOtp"
            class="text-blue-600 hover:underline"
            :disabled="resendCooldown > 0"
          >
            {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Click to resend" }}
          </button>
        </p>

        <button
          @click="handleVerifyOtp"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {{ loading ? "Verifying..." : "Submit" }}
        </button>
      </div>
    </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import loginImage from '@/assets/loginImage.png';
import login from '@/assets/login.jpg';

const phone = ref("");
const rememberMe = ref(false);
const otp = ref(["", "", "", "","",""]);
const otpDigits = [0, 1, 2, 3 , 4 , 5]; // 4-digit OTP
const step = ref("input");
const resendCooldown = ref(0);
let resendTimer;

const authStore = useAuthStore();
const router = useRouter();
const loading = ref(false);

// Request OTP
async function handleRequestOtp() {
  if (!phone.value) return;
  loading.value = true;
  const res = await authStore.sendOtp(phone.value);
  loading.value = false;

  if (res.success) {
    step.value = "otp";
    startResendCooldown();
  }
}

// Resend OTP
function handleResendOtp() {
  if (resendCooldown.value > 0) return;
  handleRequestOtp();
}

// Verify OTP
async function handleVerifyOtp() {
  const code = otp.value.join("");
  if (code.length < 6) return;

  loading.value = true;
  const res = await authStore.verifyOtp(phone.value, code);
  loading.value = false;

  if (res.success) {
    router.push({ name: "Home" });
  }
}

// Focus next input
function focusNext(index) {
  if (otp.value[index].length === 1 && index < otpDigits.length - 1) {
    const next = document.querySelectorAll("input")[index + 1];
    next.focus();
  }
}

// Start resend cooldown
function startResendCooldown() {
  resendCooldown.value = 30; // 30 sec cooldown
  clearInterval(resendTimer);
  resendTimer = setInterval(() => {
    if (resendCooldown.value > 0) {
      resendCooldown.value--;
    } else {
      clearInterval(resendTimer);
    }
  }, 1000);
}
</script>

<style>
/* Center OTP inputs nicely */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
