import { combineReducers } from 'redux';
import app from 'app/modules/app/reducer';
import dataNodes from 'app/modules/dataNodes/reducer';
import photos from 'app/modules/photos/reducer';
import queues from 'app/modules/queues/reducer';
import users from 'app/modules/users/reducer';

export const rootReducer = combineReducers({
  app,
  dataNodes,
  queues,
  photos,
  users,
});
