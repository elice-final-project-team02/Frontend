import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { errorHandler } from 'lib';

const getPostList = async () => {
  const response = await axios.get('/api/post', {
    withCredentials: true,
  });
  return response.data.data;
};

export function useGetPostList() {
  const navigate = useNavigate();

  return useQuery(['getPostList'], () => getPostList(), {
    cacheTime: 10 * 60 * 1000,
    staleTime: Infinity,
    onError: (error) => {
      errorHandler(error, navigate);
    },
    retry: 0,
  });
}
