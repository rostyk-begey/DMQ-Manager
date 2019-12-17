import { queuesApi } from './api';
import { ACTION } from './reducer';

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
