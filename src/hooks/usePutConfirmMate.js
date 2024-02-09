import axios from 'axios';
import { useQueryClient, useMutation } from 'react-query';
import { errorHandler } from 'lib';

// 돌봄메이트 확정 hooks
export const putConfirm = async ({ chatId }) => {
  const res = await axios.put(`${process.env.REACT_APP_CHAT}/confirm/${chatId}`);
  return res.data;
};

export function usePutConfirmMate() {
  const queryClient = useQueryClient();

  return useMutation(putConfirm, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('get-room');
    },
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
  });
}
