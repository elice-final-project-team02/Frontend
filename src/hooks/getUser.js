import axios from 'axios';
import { useQuery } from 'react-query';
import { errorHandler } from 'lib';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

const getUser = async () => {
  const response = await axios.get('/api/user', { withCredentials: true });
  return response.data.data;
};

export function useGetUser() {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // 첫 번째 API 호출 이후 쿼리를 비활성화
    setEnabled(false);
  }, []);

  return useQuery('get-user', () => getUser(), {
    onError: (error) => {
      errorHandler(error, navigate);
    },
    retry: 0,
    enabled,
  });
}
