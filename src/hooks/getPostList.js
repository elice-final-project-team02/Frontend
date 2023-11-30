import axios from 'axios';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';

const getPostList = async (currPage, careTarget, isLongTerm) => {
  const response = await axios.get(
    `/api/post?page=${currPage}&limit=6&careTarget=${careTarget}&isLongTerm=${isLongTerm}`,
    {
      withCredentials: true,
    }
  );
  return response.data.data;
};

export function useGetPostList(currPage, careTarget, isLongTerm) {
  const loginStatus = useRecoilValue(isLoggedInState);
  console.log(currPage, careTarget, isLongTerm);
  return useQuery(['getPostList', currPage], () => getPostList(currPage, careTarget, isLongTerm), {
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
    enabled: loginStatus !== 'LOADING',
  });
}
