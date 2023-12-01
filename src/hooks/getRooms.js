import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';

const getChatRooms = async (pageNumber, userId) => {
  const response = await axios.get(`/api/chat/rooms?page=${pageNumber}&limit=10&userId=${userId}`, {
    withCredentials: true,
  });
  return response.data.data;
};

export function useGetChatRooms(userId) {
  const loginStatus = useRecoilValue(isLoggedInState);

<<<<<<< HEAD
  const queryInfo = useQuery(['getChatRooms', pageNumber], () => getChatRooms(pageNumber), {
=======
  return useQuery(['getChatRooms', userId], () => getChatRooms(userId), {
>>>>>>> dev
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
