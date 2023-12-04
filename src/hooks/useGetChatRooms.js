import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInStateAtom';

const getChatRooms = async (pageNumber) => {
  const response = await axios.get(`/api/chat/rooms?page=${pageNumber}&limit=10`, { withCredentials: true });
  return response.data.data;
};

export function useGetChatRooms(pageNumber) {
  const loginStatus = useRecoilValue(isLoggedInState);

  const queryInfo = useQuery(['getChatRooms', pageNumber], () => getChatRooms(pageNumber), {
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
    enabled: loginStatus !== 'LOADING',
  });

  useEffect(() => {
    // Long polling 시작
    if (queryInfo.isSuccess) {
      const interval = setInterval(() => {
        queryInfo.refetch();
      }, 5000); // 5초마다 새로운 메시지를 확인

      return () => clearInterval(interval);
    }
  }, [queryInfo]);

  return queryInfo;
}
