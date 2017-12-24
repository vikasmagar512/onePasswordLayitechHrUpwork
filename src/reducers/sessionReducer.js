import initialState from './initialState';
import {browserHistory} from 'react-router';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,LOG_OUT,LOG_IN_SUCCESS,LOG_IN_FAILURE
} from '../actions/actionTypes'
export default function auth(state = {
    isFetching: false,
    isAuthenticated: (document.cookie !== "" && document.cookie.split("=")[1] !== ''),
    errorMessage:''
    // isAuthenticated: !!localStorage.getItem('id_token')
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            })
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            })
        default:
            return state
    }
}
/*
export default function sessionReducer(state = initialState, action) {

  switch(action.type) {
    case LOG_IN_SUCCESS:{
      return Object.assign({}, state, {
        loginResponse: action.response,
        session : !!sessionStorage.jwt
      });
    }

    case LOG_IN_FAILURE:{
      return Object.assign({}, state, {
        session : false,
        loginResponse: action.response
      });
    }

    case LOG_OUT:{
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
*/

