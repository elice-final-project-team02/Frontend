import axios from 'axios';
import { useQuery } from 'react-query';

const getPostList = async () => {
  const response = await axios.get('/api/post', {
    withCredentials: true,
  });
  return response.data.data;
};

export function useGetPostList() {
  // return useQuery(['getPostList'], () => getPostList(), { cacheTime: 10 * 60 * 1000 });
  return useQuery(['getPostList'], () => getPostList(), {
    cacheTime: 10 * 60 * 1000,
    staleTime: Infinity,
  });
}

