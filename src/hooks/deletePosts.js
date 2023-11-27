import axios from 'axios';
import { useMutation } from 'react-query';
import { errorHandler } from 'lib';

const deletePosts = async (postIds) => {
  const response = await axios.delete(
    '/api/post/posts/delete',
    { postIds },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export function useDeletePosts() {
  return useMutation((postIds) => deletePosts(postIds), {
    onSuccess: (response) => {
      alert(response.message);
    },
    onError: (error) => {
      errorHandler(error);
    },
  });
}
