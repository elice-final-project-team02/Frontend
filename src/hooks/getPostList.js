import axios from 'axios';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';

const getPostList = async (pageNumber, careTarget, isLongTerm) => {
  console.log(pageNumber, careTarget, isLongTerm);
  const response = await axios.get(
    `/api/post?page=${pageNumber}&limit=6&careTarget=${careTarget}&isLongTerm=${isLongTerm}`,
    {
      withCredentials: true,
    }
  );
  return response.data.data;
};

export function useGetPostList(pageNumber, careTarget, isLongTerm) {
  const loginStatus = useRecoilValue(isLoggedInState);

  return useQuery(['getPostList'], () => getPostList(pageNumber, careTarget, isLongTerm), {
    cacheTime: 10 * 60 * 1000,
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
    enabled: loginStatus !== 'LOADING',
  });
}
