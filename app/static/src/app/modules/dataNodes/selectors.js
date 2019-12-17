import { createSelector } from 'reselect';

export const selectDataNodes = state => state.dataNodes;

export const selectDataNodesIsLoading = () =>
  createSelector(selectDataNodes, state => state.isLoading);

export const selectAllDataNodes = () =>
  createSelector(selectDataNodes, state => state.data);

export const selectQueues = () =>
  createSelector(selectDataNodes, state => state.queues);
