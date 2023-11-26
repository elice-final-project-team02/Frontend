import axios from 'axios';
import { useQuery } from 'react-query';

const getUser = async () => {
  const response = await axios.get('/api/user', { withCredentials: true });
  return response.data.data;
};

export function useGetUser() {
  return useQuery('get-user', () => getUser());
}
