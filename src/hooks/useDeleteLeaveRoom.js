import axios from 'axios';
import { useMutation } from 'react-query';
import { errorHandler } from 'lib';

const deleteLeaveRoom = async (selectedChatId) => {
  const response = await axios.delete(`${process.env.REACT_APP_CHAT}/leave-room/${selectedChatId}`, {
    withCredentials: true,
  });
  return response.data;
};

export function useDeleteLeaveRoom() {
  return useMutation((selectedChatId) => deleteLeaveRoom(selectedChatId), {
    onSuccess: (response) => {
      alert(response.message);
    },
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
  });
}
