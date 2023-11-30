import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { errorHandler } from 'lib';

const putSavePost = async (postId) => {
  const response = await axios.put(
    `/api/post/save/${postId}`,
    { postId },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export function usePutSavePost() {
  const queryClient = useQueryClient();
  return useMutation((postId) => putSavePost(postId), {
    onSuccess: (response, context) => {
      const { pageNumber } = context;
      queryClient.invalidateQueries(['save-post', pageNumber]);
    },
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
  });
}
