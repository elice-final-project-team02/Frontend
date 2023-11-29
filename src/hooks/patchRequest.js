import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { errorHandler } from 'lib';
import { queryClient } from 'App';

const apiUrl = '/api/post';

const patchRequest = async (postId, body) => {
  const response = await axios.patch(`${apiUrl}/${postId}`, body, {
    withCredentials: true,
  });
  return response.data;
};

export function usePatchRequest(postId, body) {
  const navigate = useNavigate();
  return useMutation(() => patchRequest(postId, body), {
    onSuccess: (response) => {
      queryClient.invalidateQueries('getPostList');
      alert(response.message);
      navigate('/mypage/posts');
    },
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
  });
}
