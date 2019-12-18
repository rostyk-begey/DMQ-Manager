import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('users', [
  'GET_USERS',
  'GET_USERS_SUCCESS',
  'GET_USERS_ERROR',

  'CREATE_USER',
  'CREATE_USER_SUCCESS',
  'CREATE_USER_ERROR',

  'UPDATE_USER',
  'UPDATE_USER_SUCCESS',
  'UPDATE_USER_ERROR',

  'DELETE_USER',
  'DELETE_USER_SUCCESS',
  'DELETE_USER_ERROR',
]);
export const ACTION = actions(TYPE);

export const initialState = {
  isLoading: false,
  serverError: null,

  data: [],
};

export default handleActions(
  {
    /* USERS */
    [TYPE.GET_USERS]: setLoading,
    [TYPE.GET_USERS_SUCCESS]: getUsersSuccess,
    [TYPE.GET_USERS_ERROR]: setServerError,

    [TYPE.CREATE_USER]: setLoading,
    [TYPE.CREATE_USER_SUCCESS]: createUserSuccess,
    [TYPE.CREATE_USER_ERROR]: setServerError,

    [TYPE.UPDATE_USER]: setLoading,
    [TYPE.UPDATE_USER_SUCCESS]: updateUserSuccess,
    [TYPE.UPDATE_USER_ERROR]: setServerError,

    [TYPE.DELETE_USER]: setLoading,
    [TYPE.DELETE_USER_SUCCESS]: deleteUserSuccess,
    [TYPE.DELETE_USER_ERROR]: setServerError,
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

function getUsersSuccess(state, action) {
  return {
    ...state,
    isLoading: false,
    data: action.payload,
  };
}

function createUserSuccess(state, action) {
  return {
    ...state,
    isLoading: false,
    data: [...state.data, action.payload],
  };
}

function updateUserSuccess(state, { payload }) {
  return {
    ...state,
    isLoading: false,
    data: [...state.data.filter(({ id }) => id !== payload.id), payload],
  };
}

function deleteUserSuccess(state, { payload: { id: _id } }) {
  return {
    ...state,
    isLoading: false,
    data: state.data.filter(({ id }) => id !== _id),
  };
}
