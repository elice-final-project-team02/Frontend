import axios from 'axios';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInStateAtom';

const getPostList = async ({ controlTarget, controlTerm }) => {
  const queryParamsTarget = controlTarget !== '전체' ? `careTarget=${controlTarget}&` : '';
  const queryParamsTerm = controlTerm !== 'all' ? `isLongTerm=${controlTerm}` : '';

  const response = await axios.get(`/api/post?${queryParamsTarget}${queryParamsTerm}`, {
    withCredentials: true,
  });
  return response.data.data;
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
