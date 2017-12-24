import {combineReducers} from 'redux';
import auth from './sessionReducer';

const rootReducer = combineReducers({
  auth
});

export default rootReducer;