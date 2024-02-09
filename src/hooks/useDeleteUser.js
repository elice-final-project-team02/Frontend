import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { errorHandler } from 'lib';
import { isLoggedInState } from 'recoil/isLoggedInStateAtom';
import { useRecoilState } from 'recoil';

const deleteUser = async (password) => {
  const response = await axios.delete(`${process.env.REACT_APP_USER}`, {
    data: { password: password },
    withCredentials: true,
  });
  return response.data;
};

export function useDeleteUser(password) {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useRecoilState(isLoggedInState);
  return useMutation(() => deleteUser(password), {
    onSuccess: (response) => {
      alert(response.message);
      navigate('/');
      setLoginStatus('LOGGED_OUT');
    },
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
  });
}
