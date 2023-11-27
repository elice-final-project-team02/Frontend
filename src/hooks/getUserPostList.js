import axios from 'axios';
import { useQuery } from 'react-query';

const getUserPostList = async (pageNumber) => {
  const response = await axios.get(`/api/post/posts/user?page=${pageNumber}`, { withCredentials: true });
  return response.data.data;
};

export function useGetUserPostList(pageNumber) {
  return useQuery(['get-user-post-list', pageNumber], () => getUserPostList(pageNumber));
}
