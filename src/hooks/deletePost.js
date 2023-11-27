import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
import { errorHandler } from 'lib';
import { useGetRequestGoHome } from './getRequest';
import { useNavigate } from 'react-router';
const queryClient = new QueryClient();

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
  const { data: post } = useGetRequestGoHome();
  const navigate = useNavigate();
  return useMutation(() => deletePost(postId), {
    onSuccess: (response) => {
      queryClient.invalidateQueries(post);
      alert(response.message);
      navigate('/posts');
    },
    onError: (error) => {
      errorHandler(error);
    },
  });
}
