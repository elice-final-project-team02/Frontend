import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInStateAtom';

export const getRoom = async (chatId) => {
  const response = await axios.get(`/api/chat/room/${chatId}`, { withCredentials: true });
  return response.data.data.chat;
};

export function useGetRoom(chatId) {
  const loginStatus = useRecoilValue(isLoggedInState);
  const queryInfo = useQuery('get-room', () => getRoom(chatId), {
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
