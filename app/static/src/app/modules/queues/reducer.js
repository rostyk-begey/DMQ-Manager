import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('queues', [
  'GET_QUEUES',
  'GET_QUEUES_SUCCESS',
  'GET_QUEUES_ERROR',

  'CREATE_QUEUE',
  'CREATE_QUEUE_SUCCESS',
  'CREATE_QUEUE_ERROR',

  'DELETE_QUEUE',
  'DELETE_QUEUE_SUCCESS',
  'DELETE_QUEUE_ERROR',
]);
export const ACTION = actions(TYPE);

export const initialState = {
  isLoading: false,
  serverError: null,

  data: [],
};

export default handleActions(
  {
    /* QUEUES */
    [TYPE.GET_QUEUES]: setLoading,
    [TYPE.GET_QUEUES_SUCCESS]: getQueuesSuccess,
    [TYPE.GET_QUEUES_ERROR]: setServerError,

    [TYPE.CREATE_QUEUE]: setLoading,
    [TYPE.CREATE_QUEUE_SUCCESS]: createQueueSuccess,
    [TYPE.CREATE_QUEUE_ERROR]: setServerError,

    [TYPE.DELETE_QUEUE]: setLoading,
    [TYPE.DELETE_QUEUE_SUCCESS]: deleteQueueSuccess,
    [TYPE.DELETE_QUEUE_ERROR]: setServerError,
  },
  initialState,
);

function setLoading(state) {
  return { ...state, isLoading: true };
}

function setServerError(state, action) {
  return {
    ...state,
    isLoading: false,
    serverError: action.payload,
  };
}

function getQueuesSuccess(state, action) {
  return {
    ...state,
    isLoading: false,
    data: action.payload,
  };
}

function createQueueSuccess(state, action) {
  return {
    ...state,
    isLoading: false,
    data: [...state.data, action.payload],
  };
}

function deleteQueueSuccess(state, { payload: { id: _id } }) {
  return {
    ...state,
    isLoading: false,
    data: state.data.filter(({ id }) => id !== _id),
  };
}
