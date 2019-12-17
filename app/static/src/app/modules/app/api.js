import { API_URL } from 'app/constants';
import axios from 'axios';

export const getProfileApi = () => axios.get(`${API_URL}users/1`);

export const authApi = (login, password) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`${login}-${password}`);
    }, 1500);
  });
};
