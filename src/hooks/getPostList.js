import axios from 'axios';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';

const getPostList = async (pageNumber, careTarget, term) => {
  console.log(pageNumber, careTarget, term);
  const response = await axios.get(
    `/api/post?page=${pageNumber}&limit=6&careTargets=${careTarget}&isLongTerm=${term}`,
    {
      withCredentials: true,
    }
  );
  return response.data.data;
};

export function useGetPostList(pageNumber, careTarget, term) {
  const loginStatus = useRecoilValue(isLoggedInState);

  return useQuery(['getPostList'], () => getPostList(pageNumber, careTarget, term), {
    cacheTime: 10 * 60 * 1000,
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
    enabled: loginStatus !== 'LOADING',
  });
}
