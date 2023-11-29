import axios from 'axios';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';

const getUserPostList = async (pageNumber) => {
  const response = await axios.get(`/api/post/posts/user?page=${pageNumber}`, { withCredentials: true });
  return response.data.data;
};

export function useGetUserPostList(pageNumber) {
  const loginStatus = useRecoilValue(isLoggedInState);

  return useQuery(['get-user-post-list', pageNumber], () => getUserPostList(pageNumber), {
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
    enabled: loginStatus !== 'LOADING',
  });
}
