import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const postRegister = async (userInfo) => {
  const response = await axios.post('http://localhost:5001/api/user/register', userInfo);
  return response.data;
};

export function usePostRegister(userInfo) {
  const nav = useNavigate();
  return useMutation(() => postRegister(userInfo), {
    onSuccess: (response) => {
      alert(response.message);
      nav('/login');
    },
    onError: (error) => {
      alert(error);
    },
  });
}
