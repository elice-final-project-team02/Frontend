import axios from 'axios';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useNavigate } from 'react-router-dom';

const getUserPostList = async (pageNumber) => {
  const response = await axios.get(`/api/post/posts/user?page=${pageNumber}`, { withCredentials: true });
  return response.data.data;
};

export function useGetUserPostList(pageNumber) {
  const navigate = useNavigate();
  return useQuery(['get-user-post-list', pageNumber], () => getUserPostList(pageNumber), {
    onError: (error) => {
      errorHandler(error, navigate);
    },
    retry: 0,
  });
}
