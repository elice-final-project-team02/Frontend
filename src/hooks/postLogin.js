import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { errorHandler } from 'lib';
import { isLoggedInState } from 'recoil/isLoggedInState';
import { useRecoilState } from 'recoil';

const postLogin = async (email, password) => {
  const response = await axios.post(
    '/api/user/login',
    {
      email: email,
      password: password,
    },
    { withCredentials: true }
  );
  return response.data;
};

export function usePostLogin(email, password) {
  const nav = useNavigate();
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedInState);

  return useMutation(() => postLogin(email, password), {
    onSuccess: (response) => {
      alert(response.message);
      setLoggedIn(true);
      nav('/');
    },
    onError: (error) => {
      errorHandler(error);
    },
  });
}
