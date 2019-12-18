// eslint-disable-next-line no-unused-vars
import { MANAGER_URL } from 'app/constants';
import axios from 'axios';

export const dataNodeApi = {
  getAll() {
    return new Promise(resolve => {
      let dataNodes = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 10; ++i) {
        dataNodes.push({
          id: i,
          address: `127.0.0.${i}`,
          port: 5000 + i,
          cpu_load_percent: Math.random(),
        });
      }
      setTimeout(() => {
        resolve(dataNodes);
      }, 1500);
    });
    // return axios.get(`${MANAGER_URL}/data-nodes/${id}`);
  },
  create({ address, port }) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          id: '6',
          address,
          port,
          cpu_load_percent: Math.random(),
        });
      }, 1500);
    });
    // return axios.post(`${MANAGER_URL}/data-nodes/`, dataNode);
  },
  delete(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          id,
          address: '127.0.0.1',
          port: '5005',
          cpu_load_percent: Math.random(),
        });
      }, 1500);
    });
    // return axios.delete(`${MANAGER_URL}/data-nodes/${id}`);
  },
};
