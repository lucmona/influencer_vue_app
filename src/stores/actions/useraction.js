import { BASE_URL } from '../../baseURL';

export const fetchUserDataApi = async (phone) => {
  console.log("Fetching user for phone:", phone);

  const response = await fetch(
    `${BASE_URL}/transPoints/getUserInfo?mobile=${phone}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'checksum': 'unipro_welspun_world',
        'token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhME85RDAwMDAwMWtGazRVQUUiLCJpYXQiOjE2MTM3Mzc5NjF9.55TGMfE5X4DcIWiOtHvcq6mbzkZNQT-aH526mWEDAIc',
        'Cookie':
          'connect.sid=s%3AGUlwt_Gvatilni0iCx_bANNbDRIVNWMJ.rC%2Fv0Dc6cv9RJhQ3PDRVNSe6MwZdiaMc9YVeYMClges',
      },
      redirect: 'follow',
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Server error: ${errorText}`);
  }

  const data = await response.json();
  return data;
};
