import axios from 'axios';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';

const getSavedPostList = async (pageNumber) => {
  const response = await axios.get(`/api/post/posts/bookmarks?page=${pageNumber}`, { withCredentials: true });
  return response.data.data;
};

export function useGetSavedPostList(pageNumber) {
  const loginStatus = useRecoilValue(isLoggedInState);

  return useQuery(['get-saved-post-list', pageNumber], () => getSavedPostList(pageNumber), {
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
    enabled: loginStatus !== 'LOADING',
  });
}
