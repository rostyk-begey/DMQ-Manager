import { createSelector } from 'reselect';

export const selectUsers = state => state.users;

export const selectUsersIsLoading = () =>
  createSelector(selectUsers, state => state.isLoading);

export const selectAllUsers = () =>
  createSelector(selectUsers, state => state.data);
