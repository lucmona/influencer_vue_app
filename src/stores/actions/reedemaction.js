import { BASE_URL } from '../../baseURL';
import { useToastStore } from '@/stores/toastStore';

export const redeemPointsApi = async ({ userId, selectedProducts }) => {
  const toast = useToastStore();

  try {
    const response = await fetch(
      `${BASE_URL}/transPoints/redeemProducts?influencer_acc_id=${userId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'checksum': 'unipro_welspun_world',
          'token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhME85RDAwMDAwMWtGazRVQUUiLCJpYXQiOjE2MTM3Mzc5NjF9.55TGMfE5X4DcIWiOtHvcq6mbzkZNQT-aH526mWEDAIc',
        },
        body: JSON.stringify(selectedProducts),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to redeem points');
    }

    const data = await response.json();
    toast.showToast('Points redeemed successfully!', 'success');
    return data;
  } catch (error) {
    toast.showToast(error.message || 'Redemption failed', 'error');
    throw error;
  }
};
