import axios from 'axios';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';

export const getRoom = async (chatId) => {
  const response = await axios.get(`/api/chat/room/${chatId}`, { withCredentials: true });
  return response.data.data.chat;
};

export function useGetRoom(chatId) {
  const loginStatus = useRecoilValue(isLoggedInState);
  return useQuery('get-room', () => getRoom(chatId), {
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
    enabled: loginStatus !== 'LOADING',
  });
}
