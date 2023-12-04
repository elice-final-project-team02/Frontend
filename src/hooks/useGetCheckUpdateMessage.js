import axios from 'axios';

export const getCheckUpdateUser = async () => {
  const response = await axios.get('/api/chat/check-update-user', { withCredentials: true });
  return response.data.data;
};

export const getCheckUpdateCareUser = async () => {
  const response = await axios.get('/api/chat/check-update-careuser', { withCredentials: true });
  return response.data.data;
};
