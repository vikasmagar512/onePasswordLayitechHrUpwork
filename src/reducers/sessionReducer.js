import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';

export default function sessionReducer(state = initialState, action) {
  
  switch(action.type) {
    case types.LOG_IN_SUCCESS:{
      console.log('came here login success ',action.response);
      return Object.assign({}, state, {
        loginResponse: action.response,
        session : !!sessionStorage.jwt
      });
    }

    case types.LOG_IN_FAILURE:{
      return Object.assign({}, state, {
        session : false,
        loginResponse: action.response
      });
    }

    case types.LOG_OUT:{
      browserHistory.push('/');
      return Object.assign({}, state, {
        session : !!sessionStorage.jwt,
        loginResponse:{}
      });
    }
    default:{
      return state; 
    } 
  }
}

