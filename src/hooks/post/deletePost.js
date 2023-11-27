import axios from 'axios';
import { QueryClient, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useGetRequestGoHome } from './getRequest';

const queryClient = new QueryClient();

export const deletePost = async (postId) => {
  const response = await axios.delete(`/api/post/${postId}`, {
    withCredentials: true,
  });
  return response.data;
};

export function useDeletePost(postId) {
  return useMutation(() => deletePost(postId), {
    onSuccess: (response) => {
      alert(response.message);
    },
    onError: (error) => {
      if (error.response) {
        const errorCode = error.response.status;
        const errorMessage = error.response.data.message;

        if (errorCode === 404) {
          alert(errorMessage);
        } else {
          alert('서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
      } else if (error.request) {
        alert('요청을 보내는 중에 문제가 발생했습니다. 네트워크 연결을 확인해주세요.');
      } else {
        alert('요청을 처리하는 중에 문제가 발생했습니다.');
      }
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
      if (error.response) {
        const errorCode = error.response.status;
        const errorMessage = error.response.data.message;

        if (errorCode === 404) {
          alert(errorMessage);
        } else {
          alert('서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
      } else if (error.request) {
        alert('요청을 보내는 중에 문제가 발생했습니다. 네트워크 연결을 확인해주세요.');
      } else {
        alert('요청을 처리하는 중에 문제가 발생했습니다.');
      }
    },
  });
}
