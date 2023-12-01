import axios from 'axios';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';

const getPostList = async ({ controlTarget, controlTerm }) => {
  if (controlTarget === '전체' && controlTerm === 'all') {
    const response = await axios.get(`/api/post?`, {
      withCredentials: true,
    });
    return response.data.data;
  } else if (controlTarget === '전체' && controlTerm !== 'all') {
    const response = await axios.get(`/api/post?isLongTerm=${controlTerm}`, {
      withCredentials: true,
    });
    return response.data.data;
  } else if (controlTarget !== '전체' && controlTerm === 'all') {
    const response = await axios.get(`/api/post?careTarget=${controlTarget}`, {
      withCredentials: true,
    });
    return response.data.data;
  } else if (controlTarget !== '전체' && controlTerm !== 'all') {
    const response = await axios.get(`/api/post?careTarget=${controlTarget}&isLongTerm=${controlTerm}`, {
      withCredentials: true,
    });
    return response.data.data;
  }
};

export function useGetPostList({ controlTarget, controlTerm }) {
  const loginStatus = useRecoilValue(isLoggedInState);
  return useQuery(['getPostList', controlTarget, controlTerm], () => getPostList({ controlTarget, controlTerm }), {
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
    enabled: loginStatus !== 'LOADING',
  });
}
