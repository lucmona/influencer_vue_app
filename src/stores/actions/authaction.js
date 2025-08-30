import { BASE_URL } from "@/baseURL";
import { useToastStore } from "../toastStore";

export async function requestOtp(phone) {
  const toast = useToastStore();
  try {
    const res = await fetch(`${BASE_URL}/login/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_number: phone }),
    });

    return await res.json();
  } catch (error) {
     toast.showToast("Something went wrong!" , 'error');
    throw error;
  }
}

export async function verifyOtp(phone, otp) {
  try {
    const res = await fetch(`${BASE_URL}/login/loginWithOtp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_number: phone, otp: otp }),
    });

    return await res.json();
  } catch (error) {
     toast.showToast("Something went wrong!" , 'error');
    throw error;
  }
}

