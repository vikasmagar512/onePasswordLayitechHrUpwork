import {combineReducers} from 'redux';
import {auth,modal} from './sessionReducer';

const rootReducer = combineReducers({
  auth,
    modal
});

export default rootReducer;