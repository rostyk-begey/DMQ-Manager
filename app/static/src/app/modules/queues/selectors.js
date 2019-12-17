import { createSelector } from 'reselect';

export const selectQueues = state => state.queues;

export const selectQueuesIsLoading = () =>
  createSelector(selectQueues, state => state.isLoading);

export const selectAllQueues = () =>
  createSelector(selectQueues, state => state.data);
