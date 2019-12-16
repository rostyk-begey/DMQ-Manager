import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('app', [
  '~GET_PROFILE',
  'AUTH',
  'AUTH_SUCCESS',
  'AUTH_LOGOUT',
  'AUTH_ERROR',
]);
export const ACTION = actions(TYPE);

export const initialState = {
  isLoading: false,
  serverError: null,

  authToken: window.localStorage.getItem('token'),
  profileData: {},
};

export default handleActions(
  {
    [TYPE.GET_PROFILE]: setLoading,
    [TYPE.GET_PROFILE_SUCCESS]: getProfileSuccess,
    [TYPE.GET_PROFILE_ERROR]: setServerError,
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
