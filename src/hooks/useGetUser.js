import axios from 'axios';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';

export const getUser = async () => {
  const response = await axios.get(`${process.env.REACT_APP_USER}`, { withCredentials: true });
  return response.data.data;
};

export function useGetUser() {
  return useQuery('get-user', () => getUser(), {
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
  });
}
