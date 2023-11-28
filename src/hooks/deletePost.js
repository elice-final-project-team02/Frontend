import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { errorHandler } from 'lib';
import { useNavigate } from 'react-router';

const deletePost = async (postId) => {
  const response = await axios.delete(`/api/post/${postId}`, {
    withCredentials: true,
  });
  return response.data;
};

export function useDeletePost() {
  const navigate = useNavigate();

  return useMutation((postId) => deletePost(postId), {
    onSuccess: (response) => {
      alert(response.message);
    },
    onError: (error) => {
      errorHandler(error, navigate);
    },
    retry: 0,
  });
}

export function useDeletePostAndGoHome(postId) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(() => deletePost(postId), {
    onSuccess: (response) => {
      queryClient.invalidateQueries('getPostList');
      alert(response.message);
      navigate('/posts');
    },
    onError: (error) => {
      errorHandler(error, navigate);
    },
    retry: 0,
  });
}
