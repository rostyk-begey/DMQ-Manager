import { usersApi } from './api';
import { ACTION } from './reducer';

export const getUsers = () => dispatch => {
  dispatch(ACTION.getUsers());
  return usersApi
    .getAll()
    .then(data => {
      return data.map(user => {
        user.permissions = Object.entries(user.permissions).reduce(
          (acc, [perm, active]) => (active ? [...acc, perm] : acc),
          [],
        );
        return user;
      });
    })
    .then(data => dispatch(ACTION.getUsersSuccess(data)))
    .catch(error => dispatch(ACTION.getUsersError(error)));
};

export const createUser = user => dispatch => {
  dispatch(ACTION.createUser());
  return usersApi
    .create(user)
    .then(response => dispatch(ACTION.createUserSuccess(response)))
    .catch(error => dispatch(ACTION.createUserError(error)));
};

export const updateUser = user => dispatch => {
  dispatch(ACTION.updateUser());
  return usersApi
    .update(user)
    .then(response => dispatch(ACTION.updateUserSuccess(response)))
    .catch(error => dispatch(ACTION.updateUserError(error)));
};

export const deleteUser = id => dispatch => {
  dispatch(ACTION.deleteUser());
  return usersApi
    .delete(id)
    .then(response => dispatch(ACTION.deleteUserSuccess(response)))
    .catch(error => dispatch(ACTION.deleteUserError(error)));
};
