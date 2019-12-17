// eslint-disable-next-line no-unused-vars
import { MANAGER_URL } from 'app/constants';
import axios from 'axios';

export const dataNodeApi = {
  get(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id, host: '127.0.0.1', port: '5000', cpu: Math.random() });
      }, 1500);
    });
    // return axios.get(`${MANAGER_URL}/data-nodes/${id}`);
  },
  getAll() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { id: '1', host: '127.0.0.1', port: '5000', cpu: Math.random() },
          { id: '2', host: '127.0.0.1', port: '5001', cpu: Math.random() },
          { id: '3', host: '127.0.0.1', port: '5002', cpu: Math.random() },
          { id: '4', host: '127.0.0.1', port: '5003', cpu: Math.random() },
          { id: '5', host: '127.0.0.1', port: '5004', cpu: Math.random() },
          { id: '6', host: '127.0.0.1', port: '5005', cpu: Math.random() },
        ]);
      }, 1500);
    });
    // return axios.get(`${MANAGER_URL}/data-nodes/${id}`);
  },
  create({ address, port }) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id: '6', host: address, port, cpu: Math.random() });
      }, 1500);
    });
    // return axios.post(`${MANAGER_URL}/data-nodes/`, dataNode);
  },
  delete(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id, host: '127.0.0.1', port: '5005', cpu: Math.random() });
      }, 1500);
    });
    // return axios.delete(`${MANAGER_URL}/data-nodes/${id}`);
  },
};
