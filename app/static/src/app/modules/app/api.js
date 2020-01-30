import { API_URL, MANAGER_URL } from 'app/constants';
import axios from 'axios';

export const getProfileApi = () => axios.get(`${API_URL}users/1`);

export const authApi = (login, password) =>
  // axios.post(`${MANAGER_URL}/api/auth/login`, { username: login, password });
  {
    return Promise.resolve({
      access_token: 'access_token',
      refresh_token: 'refresh_token',
    });
  };
