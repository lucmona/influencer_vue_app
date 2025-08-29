import { BASE_URL } from '../../baseURL';

export const fetchPriveProductsApi = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/transPoints/getProducts?offset=0&limit=10`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'checksum': 'unipro_welspun_world',
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhME85RDAwMDAwMWtGazRVQUUiLCJpYXQiOjE2MTM3Mzc5NjF9.55TGMfE5X4DcIWiOtHvcq6mbzkZNQT-aH526mWEDAIc',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to fetch products');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.message || 'Unknown error');
  }
};
