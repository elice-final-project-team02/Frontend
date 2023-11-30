import axios from 'axios';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';

const getPostList = async ({ showPage, careTarget, isLongTerm }) => {
  if (typeof isLongTerm === 'string') {
    const response = await axios.get(
      `/api/post?page=${showPage}&limit=6&careTarget=${careTarget}&isLongTerm=${isLongTerm}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } else if (!careTarget) {
    const response = await axios.get(`/api/post?page=${showPage}&limit=6`, {
      withCredentials: true,
    });
    return response.data.data;
  } else {
    const response = await axios.get(`/api/post?page=${showPage}&limit=6&careTarget=${careTarget}`, {
      withCredentials: true,
    });
    return response.data.data;
  }
};

export function useGetPostList({ showPage, careTarget, isLongTerm }) {
  const loginStatus = useRecoilValue(isLoggedInState);
  return useQuery(
    ['getPostList', showPage, careTarget, isLongTerm],
    () => getPostList({ showPage, careTarget, isLongTerm }),
    {
      onError: (error) => {
        errorHandler(error);
      },
      retry: 0,
      enabled: loginStatus !== 'LOADING',
    }
  );
}
