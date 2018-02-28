import {combineReducers} from 'redux';
import {auth, globalApp, apps} from './sessionReducer';

const rootReducer = combineReducers({
  auth,
  globalApp,
  apps
});

export default rootReducer;