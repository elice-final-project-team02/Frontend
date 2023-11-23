import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const putUser = async (userInfo) => {
  const response = await axios.put('http://localhost:5001/api/user', userInfo, { withCredentials: true });
  return response.data;
};

export function usePutUser(userInfo) {
  const queryClient = useQueryClient();
  return useMutation(() => putUser(userInfo), {
    onSuccess: (response) => {
      alert(response.message);
      queryClient.invalidateQueries('get-user');
    },
    onError: (error) => {
      alert(error);
    },
  });
}
