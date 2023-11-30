import axios from 'axios';
import { useMutation } from 'react-query';
import { errorHandler } from 'lib';

const postSendMail = async (email) => {
  const response = await axios.post('/api/user/register/send-mail', { email: email });
  return response.data;
};

export function usePostSendMail(email) {
  return useMutation(() => postSendMail(email), {
    onSuccess: (response) => {
      alert(response.message);
    },
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
  });
}
