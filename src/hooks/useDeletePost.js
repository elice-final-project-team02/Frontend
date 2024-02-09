import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { errorHandler } from 'lib';
import { useNavigate } from 'react-router';

const deletePost = async (postId) => {
  const response = await axios.delete(`${process.env.REACT_APP_POST}/${postId}`, {
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
      errorHandler(error);
    },
    retry: 0,
  });
}
