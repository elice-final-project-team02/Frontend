import axios from 'axios';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInStateAtom';

const getSavedPostList = async (pageNumber) => {
  const response = await axios.get(`${process.env.REACT_APP_POST}/posts/bookmarks?page=${pageNumber}`, {
    withCredentials: true,
  });
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
