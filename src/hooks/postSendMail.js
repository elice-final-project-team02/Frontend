import axios from 'axios';
import { useMutation } from 'react-query';
import { errorHandler } from 'lib';
import { useNavigate } from 'react-router-dom';

const postSendMail = async (email) => {
  const response = await axios.post('/api/user/register/send-mail', { email: email });
  return response.data;
};

export function usePostSendMail(email, setEmailButtonDisabled) {
  const navigate = useNavigate();
  return useMutation(() => postSendMail(email), {
    onSuccess: (response) => {
      alert(response.message);
      setEmailButtonDisabled(true);
    },
    onError: (error) => {
      setEmailButtonDisabled(false);
      errorHandler(error, navigate);
    },
    retry: 0,
  });
}
