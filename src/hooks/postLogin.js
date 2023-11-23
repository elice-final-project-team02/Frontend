import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const postLogin = async (email, password) => {
  const response = await axios.post('http://localhost:5001/api/user/login', {
    email: email,
    password: password,
  });
  return response.data;
};

export function usePostLogin(email, password) {
  const nav = useNavigate();
  return useMutation(() => postLogin(email, password), {
    onSuccess: (response) => {
      alert(response.message);
      nav('/');
    },
    onError: (error) => {
      alert(error);
    },
  });
}
