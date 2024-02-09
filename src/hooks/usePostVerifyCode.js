import axios from 'axios';
import { useMutation } from 'react-query';
import { errorHandler } from 'lib';

const postVerifyCode = async (email, code) => {
  const response = await axios.post(`${process.env.REACT_APP_USER}/register/verify-email-code`, {
    email: email,
    code: code,
  });
  return response.data;
};

export function usePostVerifyCode(email, code, setVerifyButtonDisabled, setEmailButtonDisabled) {
  return useMutation(() => postVerifyCode(email, code), {
    onSuccess: (response) => {
      alert(response.message);
      setVerifyButtonDisabled(true);
      setEmailButtonDisabled(true);
    },
    onError: (error) => {
      setVerifyButtonDisabled(false);
      errorHandler(error);
    },
    retry: 0,
  });
}
