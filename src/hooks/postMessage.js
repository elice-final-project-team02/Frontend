import axios from 'axios';
import { useQueryClient, useMutation } from 'react-query';
import { errorHandler } from 'lib';

// 채팅 메시지 전송(send) hooks
export const postMessage = async ({chatId, content}) => {

  const res = await axios.post(`/api/chat/send-message/${chatId}`,
    { content: content });
  
  return res.data;

}


export function usePostSendMessage() {
  const queryClient = useQueryClient();

  return useMutation(postMessage, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('get-room');
      console.log(response)
    },
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
  });
}

