import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { errorHandler } from 'lib';

const deleteUser = async (password) => {
  const response = await axios.delete('/api/user', {
    data: { password: password },
    withCredentials: true,
  });
  return response.data;
};

export function useDeleteUser(password) {
  const nav = useNavigate();
  return useMutation(() => deleteUser(password), {
    onSuccess: (response) => {
      alert(response.message);
      nav('/');
    },
    onError: (error) => {
      errorHandler(error);
    },
  });
}
