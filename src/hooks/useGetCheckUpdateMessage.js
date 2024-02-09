import axios from 'axios';

export const getCheckUpdateUser = async () => {
  // const response = await axios.get('/api/chat/check-update-user', { withCredentials: true });
  // return response.data.data;
  return null;
};

export const getCheckUpdateCareUser = async () => {
  const response = await axios.get(`${process.env.REACT_APP_CHAT}/check-update-careuser`, { withCredentials: true });
  return null;
  return response.data.data;
};
