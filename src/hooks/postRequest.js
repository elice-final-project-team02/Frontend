import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { errorHandler } from 'lib';
import { queryClient } from 'App';

const apiUrl = '/api/post';

const postRequest = async (body) => {
  const response = await axios.post(apiUrl, body, {
    withCredentials: true,
  });
  return response.data;
};

export function usePostRequest(body) {
  const navigate = useNavigate();
  return useMutation(() => postRequest(body), {
    onSuccess: (response) => {
      queryClient.invalidateQueries('getPostList');
      alert(response.message);
      navigate('/posts');
    },
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
  });
}
