import axios from 'axios';
import { useMutation } from 'react-query';
import { errorHandler } from 'lib';
import { isLoggedInState } from 'recoil/isLoggedInStateAtom';
import { roleState } from 'recoil/roleStateAtom';
import { useSetRecoilState } from 'recoil';

const postLogout = async () => {
  const response = await axios.post('/api/user/logout', { withCredentials: true });
  return response.data;
};

export function usePostLogout() {
  const setLoggedIn = useSetRecoilState(isLoggedInState);
  const setRole = useSetRecoilState(roleState);

  return useMutation(() => postLogout(), {
    onSuccess: (response) => {
      alert(response.message);
      setLoggedIn('LOGGED_OUT');
      setRole('');
    },
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
  });
}
