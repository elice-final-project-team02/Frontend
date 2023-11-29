import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { errorHandler } from 'lib';

const leaveRoom = async (selectedChatId) => {
  const response = await axios.delete(`api/chat/leave-room/${selectedChatId}`, {
    withCredentials: true,
  });
  return response.data;
};

export function useLeaveRoom() {
  const navigate = useNavigate();
  return useMutation((selectedChatId) => leaveRoom(selectedChatId), {
    onSuccess: (response) => {
      alert(response.message);
      navigate('/');
    },
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
  });
}
