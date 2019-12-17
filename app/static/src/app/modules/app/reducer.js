import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('app', [
  '~GET_PROFILE',
  'AUTH',
  'AUTH_SUCCESS',
  'AUTH_LOGOUT',
  'AUTH_ERROR',

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

  authToken: window.localStorage.getItem('token'),
  profileData: {},
  queues: [],
};

export default handleActions(
  {
    [TYPE.GET_PROFILE]: setLoading,
    [TYPE.GET_PROFILE_SUCCESS]: getProfileSuccess,
    [TYPE.GET_PROFILE_ERROR]: setServerError,

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

    // /* USERS */
    // [TYPE.GET_USERS]: setLoading,
    // [TYPE.GET_USERS_SUCCESS]: getUsersSuccess,
    // [TYPE.GET_USERS_ERROR]: setServerError,
    //
    // [TYPE.CREATE_USER]: setLoading,
    // [TYPE.CREATE_USER_SUCCESS]: createUserSuccess,
    // [TYPE.CREATE_USER_ERROR]: setServerError,
    //
    // [TYPE.UPDATE_USER]: setLoading,
    // [TYPE.UPDATE_USER_SUCCESS]: updateUserSuccess,
    // [TYPE.UPDATE_USER_ERROR]: setServerError,
    //
    // [TYPE.DELETE_USER]: setLoading,
    // [TYPE.DELETE_USER_SUCCESS]: deleteUserSuccess,
    // [TYPE.DELETE_USER_ERROR]: setServerError,

    /* AUTH */
    [TYPE.AUTH]: setLoading,
    [TYPE.AUTH_SUCCESS]: authSuccess,
    [TYPE.AUTH_LOGOUT]: authLogout,
    [TYPE.AUTH_ERROR]: setServerError,
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

function getProfileSuccess(state, action) {
  return {
    ...state,
    isLoading: false,
    profileData: action.payload,
  };
}

function authSuccess(state, action) {
  return {
    ...state,
    isLoading: false,
    authToken: action.payload,
  };
}

function authLogout(state) {
  return {
    ...state,
    isLoading: false,
    authToken: '',
    profileData: {},
  };
}

function getQueuesSuccess(state, action) {
  return {
    ...state,
    isLoading: false,
    queues: action.payload,
  };
}

function createQueueSuccess(state, action) {
  return {
    ...state,
    isLoading: false,
    queues: [...state.queues, action.payload],
  };
}

function deleteQueueSuccess(state, { payload: { id: _id } }) {
  return {
    ...state,
    isLoading: false,
    queues: state.queues.filter(({ id }) => id !== _id),
  };
}

function getUsersSuccess(state, action) {
  return {
    ...state,
    isLoading: false,
    user: action.payload,
  };
}

function createUserSuccess(state, action) {
  return {
    ...state,
    isLoading: false,
    user: [...state.user, action.payload],
  };
}

function updateUserSuccess(state, action) {
  return {
    ...state,
    isLoading: false,
    user: [...state.user, action.payload],
  };
}

function deleteUserSuccess(state, { payload: { id: _id } }) {
  return {
    ...state,
    isLoading: false,
    user: state.user.filter(({ id }) => id !== _id),
  };
}
