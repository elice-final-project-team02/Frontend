import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const deleteUser = async (password) => {
  const response = await axios.delete(
    'http://localhost:5001/api/user',
    { password: password },
    { withCredentials: true }
  );
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
      alert(error);
    },
  });
}
