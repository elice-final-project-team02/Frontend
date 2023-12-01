import axios from 'axios';
import { useQuery } from 'react-query';
import { isLoggedInState } from 'recoil/isLoggedInState';
import { useRecoilValue } from 'recoil';

const getCheckUpdateMessage = async () => {
  const response = await axios.get('/api/chat/check-update', { withCredentials: true });
  return response.data.data;
};

export function useGetCheckUpdateMessage() {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  return useQuery('get-check-update', () => getCheckUpdateMessage(), {
    retry: 0,
    enabled: isLoggedIn === 'LOGGED_IN',
    refetchOnWindowFocus: false,
  });
}
