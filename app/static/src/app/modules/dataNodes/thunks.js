import { dataNodeApi } from './api';
import { ACTION } from './reducer';

export const getDataNodes = () => dispatch => {
  dispatch(ACTION.getDataNodes());
  return dataNodeApi
    .getAll()
    .then(response => {
      dispatch(ACTION.getDataNodesSuccess(response));
    })
    .catch(error => dispatch(ACTION.getDataNodesError(error)));
};

export const createDataNode = dataNode => dispatch => {
  dispatch(ACTION.createDataNode());
  return dataNodeApi
    .create(dataNode)
    .then(response => {
      dispatch(ACTION.createDataNodeSuccess(response));
    })
    .catch(error => dispatch(ACTION.createDataNodeError(error)));
};

export const deleteDataNode = id => dispatch => {
  dispatch(ACTION.createDataNode());
  return dataNodeApi
    .delete(id)
    .then(response => {
      dispatch(ACTION.deleteDataNodeSuccess(response));
    })
    .catch(error => dispatch(ACTION.deleteDataNodeError(error)));
};
