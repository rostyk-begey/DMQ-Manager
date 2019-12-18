// eslint-disable-next-line no-unused-vars
import { MANAGER_URL } from 'app/constants';
import axios from 'axios';

const getPermissions = () => ({
  create_queues: Math.random() > 0.5,
  delete_queues: Math.random() > 0.5,
  connect_nodes: Math.random() > 0.5,
  disconnect_nodes: Math.random() > 0.5,
  send_message: Math.random() > 0.5,
  get_message: Math.random() > 0.5,
  admin: false,
});

export const usersApi = {
  config: {
    headers: {
      token: window.localStorage.getItem('access_token'),
    },
  },
  getAll() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { id: '1', username: 'User 1', permissions: getPermissions() },
          { id: '2', username: 'User 2', permissions: getPermissions() },
          { id: '3', username: 'User 3', permissions: getPermissions() },
          { id: '4', username: 'User 4', permissions: getPermissions() },
          { id: '5', username: 'User 5', permissions: getPermissions() },
          { id: '6', username: 'User 6', permissions: getPermissions() },
        ]);
      }, 1500);
    });
    // return axios.get(`${MANAGER_URL}/data-nodes/${id}`, {}, this.config);
  },
  create(user) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          id: '256',
          username: user.username,
          permissions: user.permissions,
        });
      }, 1500);
    });
    // return axios.post(`${MANAGER_URL}/api/users/`, user);
  },
  update(user) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(user);
      }, 1500);
    });
    // return axios.put(`${MANAGER_URL}/users/${user.id}`, user, this.config);
  },
  delete(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id, username: `User ${id}` });
      }, 1500);
    });
    // return axios.delete(`${MANAGER_URL}/users/${id}`, {}, this.config);
  },
};
