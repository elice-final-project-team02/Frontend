import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { errorHandler } from 'lib';

const putUser = async (userInfo) => {
  const response = await axios.put('/api/user', userInfo, { withCredentials: true });
  return response.data;
};

export function usePutUser() {
  const queryClient = useQueryClient();
  return useMutation((userInfo) => putUser(userInfo), {
    onSettled: () => {
      queryClient.invalidateQueries('get-user');
    },
    onSuccess: (response) => {
      alert(response.message);
    },
    onError: (error) => {
      errorHandler(error);
    },
  });
}
