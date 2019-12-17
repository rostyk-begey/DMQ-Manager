import { getProfileApi, authApi } from './api';
import { ACTION } from './reducer';

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
