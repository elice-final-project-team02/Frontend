import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { errorHandler } from 'lib';

const postRegister = async (userInfo) => {
  const response = await axios.post('/api/user/register', userInfo, { withCredentials: true });
  return response.data;
};

export function usePostRegister(userInfo) {
  const navigate = useNavigate();
  return useMutation(() => postRegister(userInfo), {
    onSuccess: (response) => {
      alert(response.message);
      navigate('/login');
    },
    onError: (error) => {
      errorHandler(error, navigate);
    },
    retry: 0,
  });
}
