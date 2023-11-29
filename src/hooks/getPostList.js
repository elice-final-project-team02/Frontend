import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { errorHandler } from 'lib';

const getPostList = async (pageNumber, careTarget) => {
  const response = await axios.get(`/api/post?page=${pageNumber}&limit=6&careTargets=${careTarget}`, {
    withCredentials: true,
  });
  return response.data.data;
};

export function useGetPostList(pageNumber, careTarget) {
  const navigate = useNavigate();

  return useQuery(['getPostList'], () => getPostList(pageNumber, careTarget), {
    cacheTime: 10 * 60 * 1000,
    onError: (error) => {
      errorHandler(error, navigate);
    },
    retry: 0,
  });
}
