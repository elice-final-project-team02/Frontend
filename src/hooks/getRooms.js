import axios from 'axios';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';

const getChatRooms = async (pageNumber) => {
  const response = await axios.get(`/api/chat/rooms?page=${pageNumber}&limit=10`, { withCredentials: true });
  return response.data.data;
};

export function useGetChatRooms(pageNumber) {
  const loginStatus = useRecoilValue(isLoggedInState);

  return useQuery(['getChatRooms', pageNumber], () => getChatRooms(pageNumber), {
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
    enabled: loginStatus !== 'LOADING',
  });
}
