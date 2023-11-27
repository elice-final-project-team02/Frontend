import axios from 'axios';
import { useQuery } from 'react-query';

const getCompletedPostList = async (pageNumber) => {
  const response = await axios.get(`/api/post/posts/completed?page=${pageNumber}`, { withCredentials: true });
  return response.data.data;
};

export function useGetCompletedPostList(pageNumber) {
  return useQuery(['get-completed-post-list', pageNumber], () => getCompletedPostList(pageNumber));
}
