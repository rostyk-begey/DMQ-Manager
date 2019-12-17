import { getProfileApi, authApi } from './api';
import { ACTION } from './reducer';
import { queuesApi } from './api';

export const getProfile = () => dispatch => {
  dispatch(ACTION.getProfile());
  return getProfileApi()
    .then(result => dispatch(ACTION.getProfileSuccess(result.data)))
    .catch(error => dispatch(ACTION.getProfileError(error)));
};

export const authLogin = (login, password) => dispatch => {
  dispatch(ACTION.auth());
  return authApi(login, password)
    .then(({ data }) => JSON.stringify(data))
    .then(token => {
      window.localStorage.setItem('token', token);
      dispatch(ACTION.authSuccess(token));
    })
    .catch(error => dispatch(ACTION.authError(error)));
};

export const authLogout = () => dispatch => {
  window.localStorage.setItem('token', '');
  dispatch(ACTION.authLogout());
};

export const getQueues = () => dispatch => {
  dispatch(ACTION.getQueues());
  return queuesApi
    .getAll()
    .then(response => {
      dispatch(ACTION.getQueuesSuccess(response));
    })
    .catch(error => dispatch(ACTION.getQueuesError(error)));
};

export const createQueue = queue => dispatch => {
  dispatch(ACTION.createQueue());
  return queuesApi
    .create(queue)
    .then(response => {
      dispatch(ACTION.createQueueSuccess(response));
    })
    .catch(error => dispatch(ACTION.createQueueError(error)));
};

export const deleteQueue = id => dispatch => {
  dispatch(ACTION.createQueue());
  return queuesApi
    .delete(id)
    .then(response => {
      dispatch(ACTION.deleteQueueSuccess(response));
    })
    .catch(error => dispatch(ACTION.deleteQueueError(error)));
};
