// eslint-disable-next-line no-unused-vars
import { MANAGER_URL } from 'app/constants';
import axios from 'axios';

export const queuesApi = {
  config: {
    headers: {
      token: window.localStorage.getItem('access_token'),
    },
  },
  getAll() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { id: '1', name: 'Queue 1' },
          { id: '2', name: 'Queue 2' },
          { id: '3', name: 'Queue 3' },
          { id: '4', name: 'Queue 4' },
          { id: '5', name: 'Queue 5' },
          { id: '6', name: 'Queue 6' },
        ]);
      }, 1500);
    });
    // return axios.get(`${MANAGER_URL}/api/queues`, this.config);
  },
  create(queue) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id: 256, ...queue });
      }, 1500);
    });
    // return axios.post(`${MANAGER_URL}/api/queues`, queue, this.config);
  },
  delete(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id, name: `Test ${id}` });
      }, 1500);
    });
    // return axios.delete(`${MANAGER_URL}/api/queues/${id}`, this.config);
  },
};
