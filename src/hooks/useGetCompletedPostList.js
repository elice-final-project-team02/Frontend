import axios from 'axios';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInStateAtom';

const getCompletedPostListUser = async (pageNumber) => {
  const response = await axios.get(`/api/post/posts/completed-user?page=${pageNumber}`, { withCredentials: true });
  return response.data.data;
};

const getCompletedPostListCareUser = async (pageNumber) => {
  const response = await axios.get(`/api/post/posts/completed-careuser?page=${pageNumber}`, { withCredentials: true });
  return response.data.data;
};

export function useGetCompletedPostList(role, pageNumber) {
  const loginStatus = useRecoilValue(isLoggedInState);

  const userQuery = useQuery(['get-completed-post-list-user', pageNumber], () => getCompletedPostListUser(pageNumber), {
    enabled: role === 'user' && loginStatus !== 'LOADING',
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
  });

  const careUserQuery = useQuery(
    ['get-completed-post-list-care-user', pageNumber],
    () => getCompletedPostListCareUser(pageNumber),
    {
      enabled: role !== 'user' && loginStatus !== 'LOADING',
      onError: (error) => {
        errorHandler(error);
      },
      retry: 0,
    }
  );

  const data = role === 'user' ? userQuery.data : careUserQuery.data;
  const isLoading = role === 'user' ? userQuery.isLoading : careUserQuery.isLoading;

  return { data, isLoading };
}
