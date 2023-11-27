import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { errorHandler } from 'lib';

const putCancelBookmarks = async (postIds) => {
  const response = await axios.put(
    '/api/post/posts/cancels',
    { postIds },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export function usePutCancelBookMarks() {
  const queryClient = useQueryClient();
  return useMutation((postIds) => putCancelBookmarks(postIds), {
    onSuccess: (response, context) => {
      const { pageNumber } = context;
      alert(response.message);
      queryClient.invalidateQueries(['get-saved-post-list', pageNumber]);
    },
    onError: (error) => {
      errorHandler(error);
    },
  });
}
