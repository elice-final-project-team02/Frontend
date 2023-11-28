import axios from 'axios';
import { errorHandler } from 'lib';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
const apiUrl = '/api/post';
export const getRequest = async (postId) => {
  const response = await axios.get(`${apiUrl}/${postId}`, {
    withCredentials: true,
  });
  return response.data.data;
};

export function useGetRequest(postId) {
  return useQuery(['getRequest'], () => getRequest(postId));
}

export function useGetRequestGoHome(postId) {
  const navigate = useNavigate();
  return useQuery(['getRequest'], () => getRequest(postId), {
    onError: (error) => {
      errorHandler(error, navigate);
      navigate('/posts');
    },
    retry: 0,
  });
}
