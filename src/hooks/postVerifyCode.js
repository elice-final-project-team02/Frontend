import axios from 'axios';
import { useMutation } from 'react-query';
import { errorHandler } from 'lib';

const postVerifyCode = async (email, code) => {
  const response = await axios.post('/api/user/register/verify-email-code', {
    email: email,
    code: code,
  });
  return response.data;
};

export function usePostVerifyCode(email, code, setVerifyButtonDisabled) {
  return useMutation(() => postVerifyCode(email, code), {
    onSuccess: (response) => {
      alert(response.message);
      setVerifyButtonDisabled(true);
    },
    onError: (error) => {
      setVerifyButtonDisabled(false);
      errorHandler(error);
    },
  });
}
