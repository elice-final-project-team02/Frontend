import axios from 'axios';
import { useMutation } from 'react-query';

const postVerifyCode = async (email, code) => {
  const response = await axios.post('http://localhost:5001/api/user/register/verify-email-code', {
    email: email,
    code: code,
  });
  return response.data;
};

export function usePostVerifyCode(email, code) {
  return useMutation(() => postVerifyCode(email, code), {
    onSuccess: (response) => {
      alert(response.message);
    },
    onError: (error) => {
      alert(error);
    },
  });
}
