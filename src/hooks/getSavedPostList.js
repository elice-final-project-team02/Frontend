import axios from 'axios';
import { useQuery } from 'react-query';

const getSavedPostList = async (pageNumber) => {
  const response = await axios.get(`/api/post/posts/bookmarks?page=${pageNumber}`, { withCredentials: true });
  return response.data.data;
};

export function useGetSavedPostList(pageNumber) {
  return useQuery(['get-saved-post-list', pageNumber], () => getSavedPostList(pageNumber));
}
