import {combineReducers} from 'redux';
import {auth, modal, globalApp, apps} from './sessionReducer';

const rootReducer = combineReducers({
  auth,
    modal,
    globalApp,
    apps
});

export default rootReducer;