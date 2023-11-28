import axios from 'axios';
import { useMutation } from 'react-query';
import { errorHandler } from 'lib';
import { useNavigate } from 'react-router';
import { queryClient } from 'App';

const deletePost = async (postId) => {
  const response = await axios.delete(`/api/post/${postId}`, {
    withCredentials: true,
  });
  return response.data;
};

export function useDeletePost() {
  return useMutation((postId) => deletePost(postId), {
    onSuccess: (response) => {
      alert(response.message);
    },
    onError: (error) => {
      errorHandler(error);
    },
  });
}

export function useDeletePostAndGoHome(postId) {
  const navigate = useNavigate();
  return useMutation(() => deletePost(postId), {
    onSuccess: (response) => {
      queryClient.invalidateQueries('getPostList');
      alert(response.message);
      navigate('/posts');
    },
    onError: (error) => {
      errorHandler(error);
    },
  });
}
