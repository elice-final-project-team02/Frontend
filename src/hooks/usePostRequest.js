import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { errorHandler } from 'lib';
import { queryClient } from 'App';

const apiUrl = `${process.env.REACT_APP_POST}`;

const postRequest = async (body) => {
  const response = await axios.post(apiUrl, body, {
    withCredentials: true,
  });
  return response.data;
};

export function usePostRequest(body) {
  const navigate = useNavigate();
  return useMutation(() => postRequest(body), {
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
