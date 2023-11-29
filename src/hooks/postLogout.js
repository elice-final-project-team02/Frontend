import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { errorHandler } from 'lib';
import { isLoggedInState } from 'recoil/isLoggedInState';
import { roleState } from 'recoil/roleState';
import { useSetRecoilState } from 'recoil';

const postLogout = async () => {
  const response = await axios.post('/api/user/logout', { withCredentials: true });
  return response.data;
};

export function usePostLogout() {
  const navigate = useNavigate();
  const setLoggedIn = useSetRecoilState(isLoggedInState);
  const setRole = useSetRecoilState(roleState);

  return useMutation(() => postLogout(), {
    onSuccess: (response) => {
      alert(response.message);
      setLoggedIn('LOGGED_OUT');
      setRole('');
      navigate('/');
    },
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
  });
}
