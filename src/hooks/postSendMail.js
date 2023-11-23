import axios from 'axios';
import { useMutation } from 'react-query';

const postSendMail = async (email) => {
  const response = await axios.post('http://localhost:5001/api/user/register/send-mail', { email: email });
  return response.data;
};

export function usePostSendMail(email) {
  return useMutation(() => postSendMail(email), {
    onSuccess: (response) => {
      alert(response.message);
    },
    onError: (error) => {
      alert(error);
    },
  });
}
