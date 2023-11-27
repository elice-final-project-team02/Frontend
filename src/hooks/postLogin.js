import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { errorHandler } from 'lib';
import { isLoggedInState } from 'recoil/isLoggedInState';
import { roleState } from 'recoil/roleState';
import { useSetRecoilState } from 'recoil';

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
  const setLoggedIn = useSetRecoilState(isLoggedInState);
  const setRole = useSetRecoilState(roleState);

  return useMutation(() => postLogin(email, password), {
    onSuccess: (response) => {
      alert(response.message);
      setLoggedIn(true);
      setRole(response.data.role.role);
      nav('/');
    },
    onError: (error) => {
      errorHandler(error);
    },
  });
}
