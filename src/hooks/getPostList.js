import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { errorHandler } from 'lib';

const getPostList = async (pageNumber, careTarget) => {
  const response = await axios.get(`/api/post?page=${pageNumber}&limit=6?careTarget=${careTarget}`, {
    withCredentials: true,
  });
  return response.data.data;
};

export function useGetPostList(pageNumber, careTarge) {
  const navigate = useNavigate();

  return useQuery(['getPostList', pageNumber, careTarge], () => getPostList(pageNumber, careTarge), {
    cacheTime: 10 * 60 * 1000,
    onError: (error) => {
      errorHandler(error, navigate);
    },
    retry: 0,
  });
}
