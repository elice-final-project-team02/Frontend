import axios from 'axios';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';

const getPostList = async ({ careTarget, isLongTerm }) => {
  if (typeof isLongTerm === 'string' && careTarget) {
    const response = await axios.get(`/api/post?careTarget=${careTarget}&isLongTerm=${isLongTerm}`, {
      withCredentials: true,
    });
    return response.data.data;
  } else if (typeof isLongTerm === 'string' && !careTarget) {
    const response = await axios.get(`/api/post?isLongTerm=${isLongTerm}`, {
      withCredentials: true,
    });
    return response.data.data;
  } else if (!careTarget) {
    const response = await axios.get(`/api/post?`, {
      withCredentials: true,
    });
    return response.data.data;
  } else if (!careTarget && isLongTerm) {
    const response = await axios.get(`/api/post?isLongTerm=${isLongTerm}`, {
      withCredentials: true,
    });
    return response.data.data;
  } else {
    const response = await axios.get(`/api/post?careTarget=${careTarget}`, {
      withCredentials: true,
    });
    return response.data.data;
  }
};

export function useGetPostList({ careTarget, isLongTerm }) {
  const loginStatus = useRecoilValue(isLoggedInState);
  return useQuery(['getPostList', careTarget, isLongTerm], () => getPostList({ careTarget, isLongTerm }), {
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
    enabled: loginStatus !== 'LOADING',
  });
}
