import axios from 'axios';
import { useQuery } from 'react-query';

const apiUrl = 'http://localhost:5001/api/post';

const getRequest = async (postId) => {
  const response = await axios.get(`${apiUrl}/${postId}`, {
    withCredentials: true,
  });
  return response.data.data;
};

export function useGetRequest(postId) {
  return useQuery(['getRequest'], () => getRequest(postId), { cacheTime: 10 * 60 * 1000 });
}
