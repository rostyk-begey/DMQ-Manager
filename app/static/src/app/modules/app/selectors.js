import { createSelector } from 'reselect';

export const selectApp = state => state.app;

export const selectAppIsLoading = () =>
  createSelector(
    selectApp,
    state => state.isLoading,
  );

export const selectAppProfileData = () =>
  createSelector(
    selectApp,
    state => state.profileData,
  );

export const selectAccessToken = () =>
  createSelector(
    selectApp,
    state => state.accessToken,
  );

export const selectRefreshToken = () =>
  createSelector(
    selectApp,
    state => state.refreshToken,
  );
