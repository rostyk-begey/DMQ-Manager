import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('dataNodes', [
  'GET_DATA_NODES',
  'GET_DATA_NODES_SUCCESS',
  'GET_DATA_NODES_ERROR',

  'CREATE_DATA_NODE',
  'CREATE_DATA_NODE_SUCCESS',
  'CREATE_DATA_NODE_ERROR',

  'DELETE_DATA_NODE',
  'DELETE_DATA_NODE_SUCCESS',
  'DELETE_DATA_NODE_ERROR',
]);
export const ACTION = actions(TYPE);

export const initialState = {
  isLoading: false,
  serverError: null,

  data: [],
};

export default handleActions(
  {
    /* DATA_NODES */
    [TYPE.GET_DATA_NODES]: setLoading,
    [TYPE.GET_DATA_NODES_SUCCESS]: getDataNodesSuccess,
    [TYPE.GET_DATA_NODES_ERROR]: setServerError,

    [TYPE.CREATE_DATA_NODE]: setLoading,
    [TYPE.CREATE_DATA_NODE_SUCCESS]: createDataNodeSuccess,
    [TYPE.CREATE_DATA_NODE_ERROR]: setServerError,

    [TYPE.DELETE_DATA_NODE]: setLoading,
    [TYPE.DELETE_DATA_NODE_SUCCESS]: deleteDataNodeSuccess,
    [TYPE.DELETE_DATA_NODE_ERROR]: setServerError,
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

function getDataNodesSuccess(state, action) {
  return {
    ...state,
    isLoading: false,
    data: action.payload,
  };
}

function createDataNodeSuccess(state, action) {
  return {
    ...state,
    isLoading: false,
    data: [...state.data, action.payload],
  };
}

function deleteDataNodeSuccess(state, { payload: { id: _id } }) {
  return {
    ...state,
    isLoading: false,
    data: state.data.filter(({ id }) => id !== _id),
  };
}
