import {combineReducers} from 'redux';
import {auth,modal,globalApp} from './sessionReducer';

const rootReducer = combineReducers({
  auth,
    modal,
    globalApp
});

export default rootReducer;