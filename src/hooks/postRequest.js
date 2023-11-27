import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { errorHandler } from 'lib';

const apiUrl = '/api/post';

const postRequest = async (body) => {
  const response = await axios.post(apiUrl, body, {
    withCredentials: true,
  });
  return response.data;
};

export function usePostRequest(body) {
  const nav = useNavigate();
  return useMutation(() => postRequest(body), {
    onSuccess: (response) => {
      alert(response.message);
      nav('/posts');
    },
    onError: (error) => {
      errorHandler(error);
    },
  });
}
