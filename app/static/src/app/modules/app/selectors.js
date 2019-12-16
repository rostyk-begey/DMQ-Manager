import { createSelector } from 'reselect';

export const selectApp = state => state.app;

export const selectAppProfileData = () =>
  createSelector(selectApp, state => state.profileData);

export const selectAuthToken = () =>
  createSelector(selectApp, state => state.authToken);
