// 신청하기 모달 창 영역 hooks
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { errorHandler } from 'lib';

// 신청하기(send) 함수
export const postApplicate = async ({ postId, content }) => {
  const res = await axios.post(`/api/chat/applicate`, { postId: postId, content: content });
  return res.data;
};

export function usePostApplicate() {
  const queryClient = useQueryClient();
  return useMutation(postApplicate, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('getChatRooms', { refetchActive: true });
    },
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
  });
}
