import axios from 'axios';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useNavigate } from 'react-router-dom';

const getSavedPostList = async (pageNumber) => {
  const response = await axios.get(`/api/post/posts/bookmarks?page=${pageNumber}`, { withCredentials: true });
  return response.data.data;
};

export function useGetSavedPostList(pageNumber) {
  const navigate = useNavigate();
  return useQuery(['get-saved-post-list', pageNumber], () => getSavedPostList(pageNumber), {
    onError: (error) => {
      errorHandler(error, navigate);
    },
    retry: 0,
  });
}
