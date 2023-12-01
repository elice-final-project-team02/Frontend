import axios from 'axios';

export const getCheckUpdateMessage = async () => {
  const response = await axios.get('/api/chat/check-update', { withCredentials: true });
  return response.data.data;
};
