import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { errorHandler } from 'lib';

const putcancelPost = async (postId) => {
  const response = await axios.put(
    `/api/post/cancel/${postId}`,
    { postId },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export function usePutCancelPost() {
  const queryClient = useQueryClient();
  return useMutation((postId) => putcancelPost(postId), {
    onSuccess: (response, context) => {
      const { pageNumber } = context;
      queryClient.invalidateQueries(['save-post', pageNumber]);
    },
    retry: 0,
  });
}
