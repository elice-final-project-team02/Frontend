import axios from 'axios';
import { useMutation } from 'react-query';
import { errorHandler } from 'lib';
import { useNavigate } from 'react-router';

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
  const navigate = useNavigate();
  return useMutation((postIds) => deletePosts(postIds), {
    onSuccess: (response) => {
      alert(response.message);
    },
    onError: (error) => {
      errorHandler(error, navigate);
    },
    retry: 0,
  });
}
