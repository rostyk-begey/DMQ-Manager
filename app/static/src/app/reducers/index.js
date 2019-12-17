import { combineReducers } from 'redux';
import app from 'app/modules/app/reducer';
import dataNodes from 'app/modules/dataNodes/reducer';
import photos from 'app/modules/photos/reducer';

export const rootReducer = combineReducers({
  app,
  dataNodes,
  photos,
});
