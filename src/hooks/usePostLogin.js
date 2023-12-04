import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { errorHandler } from 'lib';
import { isLoggedInState } from 'recoil/isLoggedInStateAtom';
import { roleState } from 'recoil/roleStateAtom';
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
  const navigate = useNavigate();
  const setLoggedIn = useSetRecoilState(isLoggedInState);
  const setRole = useSetRecoilState(roleState);

  return useMutation(() => postLogin(email, password), {
    onSuccess: (response) => {
      alert(response.message);
      setLoggedIn('LOGGED_IN');
      setRole(response.data.role.role);
      navigate('/');
    },
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
  });
}
