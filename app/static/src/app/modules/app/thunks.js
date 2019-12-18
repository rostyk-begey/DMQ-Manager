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
    .then(({ access_token, refresh_token }) => {
      window.localStorage.setItem('access_token', access_token);
      window.localStorage.setItem('refresh_token', refresh_token);
      dispatch(ACTION.authSuccess({ access_token, refresh_token }));
    })
    .catch(error => dispatch(ACTION.authError(error)));
};

export const authLogout = () => dispatch => {
  window.localStorage.setItem('access_token', '');
  window.localStorage.setItem('refresh_token', '');
  dispatch(ACTION.authLogout());
};
