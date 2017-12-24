import initialState from './initialState';
import {browserHistory} from 'react-router';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOG_OUT, LOG_IN_SUCCESS, LOG_IN_FAILURE, OPEN_MODAL,
    CLOSE_MODAL, INPUT_CHANGE, MODAL_INPUT_CHANGE, EDIT_LOGIN_CREDENTIALS, BACK_BUTTON, NEXT_BUTTON, ADD_MORE_PARAMS
} from '../actions/actionTypes'
export function auth(state = {
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
const modalState= {
    login_required:false,
    url:'',
    url_id:'',
    service:'crosssite',
    steps:[
        {
            userrole:new Set()
        },{
            login_type:{
                // 'admin':'Cookie'
            }
        },{
            success_url:{
                // 'admin':'www.google.com'
            }
        },{
            /*'admin':{
                Cookie:[this.getValues(Cookie,1)],
                Credentials:[this.getValues(Credentials,1)],
                Selenium:[this.getValues(Selenium,1)],
            }*/
        }
    ],
    modalOpen:false,
    crosssite : { activeRole:'',currentstep: 1, limit: 5, edit_login: 0 }
}
export function modal(state = modalState, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return {...state,modalOpen:true}
        case CLOSE_MODAL:
            return {...state,modalOpen:false,crosssite:{...state.crosssite,currentstep:1,activeRole:""}}
        case MODAL_INPUT_CHANGE:
            return {...state,steps:action.data.steps,crosssite:action.data.crosssite}
        case EDIT_LOGIN_CREDENTIALS:
            return {...state,crosssite:action.data}
        case INPUT_CHANGE:
            return {...state,...action.data}
        case BACK_BUTTON:
            return {...state,crosssite:action.data}
        case NEXT_BUTTON:
            return {...state,crosssite:action.data}
        case ADD_MORE_PARAMS:
            return {...state,steps:action.data.steps}
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

