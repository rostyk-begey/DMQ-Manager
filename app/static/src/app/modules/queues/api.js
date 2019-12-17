// eslint-disable-next-line no-unused-vars
import { MANAGER_URL } from 'app/constants';
import axios from 'axios';

export const queuesApi = {
  get(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id, name: `Test ${id}` });
      }, 1500);
    });
    // return axios.get(`${MANAGER_URL}/data-nodes/${id}`);
  },
  getAll() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { id: '1', name: 'Test 1' },
          { id: '2', name: 'Test 2' },
          { id: '3', name: 'Test 3' },
          { id: '4', name: 'Test 4' },
          { id: '5', name: 'Test 5' },
          { id: '6', name: 'Test 6' },
        ]);
      }, 1500);
    });
    // return axios.get(`${MANAGER_URL}/data-nodes/${id}`);
  },
  create(queue) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id: 256, ...queue });
      }, 1500);
    });
    // return axios.post(`${MANAGER_URL}/data-nodes/`, dataNode);
  },
  delete(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id, name: `Test ${id}` });
      }, 1500);
    });
    // return axios.delete(`${MANAGER_URL}/data-nodes/${id}`);
  },
};
