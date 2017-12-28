import sessionApi from '../api/SessionApi';
import auth from '../auth/authenticator';
const BASE_URL ='http://35.167.23.92'
import {
    LOG_IN_FAILURE, LOG_IN_SUCCESS, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGOUT_SUCCESS, LOGOUT_REQUEST,
    OPEN_MODAL, CLOSE_MODAL, MODAL_INPUT_CHANGE, INPUT_CHANGE, BACK_BUTTON, ADD_MORE_PARAMS, EDIT_LOGIN_CREDENTIALS,
    NEXT_BUTTON, OPEN_REGISTER_MODAL, CLOSE_REGISTER_MODAL, SET_CURRENT_STEP_ERROR
} from "./actionTypes";

export function loginSuccess(response) {
  return {type: LOG_IN_SUCCESS,response:response}
}
export function loginFailure(response) {
  return {type: LOG_IN_FAILURE,response:response}
}

/*export function logOutUser() {
  auth.logOut();
  return {type: types.LOG_OUT}
}*/
/*export function loginUser(credentials) {
  return function(dispatch) {
    // No request to web server
      /!*let flag = login(credentials);
      if (flag.success){
        sessionStorage.setItem('jwt', true);
        // dispatch(loginSuccess(flag));
        dispatch({type: types.LOG_IN_SUCCESS,response:flag});
      }else {
        dispatch(loginFailure(flag));
      }*!/

    // Request to web server
    return sessionApi.login(credentials).then(response => {
      let flag = response;
      if (flag.success){
        sessionStorage.setItem('jwt', true);
        dispatch(loginSuccess(flag));
      }else {
        dispatch(loginFailure(flag));
      }
    }).catch(error => {
      throw(error);
    }); 
  };
}*/
// The middleware to call the API for quotes
import { CALL_API } from '../middleware/api'

// There are three possible states for our login
// process and we need actions for each of them


function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

export function openModal() {
    return {
        type: OPEN_MODAL
    }
}

export function closeModal() {
    return {
        type: CLOSE_MODAL
    }
}

export function onModalInputChange(data) {
    return {
        type: MODAL_INPUT_CHANGE,
        data
    }
}

export function editLoginCredentials(data) {
    return {
        type: EDIT_LOGIN_CREDENTIALS,
        data
    }
}
export function inputChange(data) {
    return {
        type: INPUT_CHANGE,
        data
    }
}

export function backButtonHandle(data) {
    return {
        type: BACK_BUTTON,
        data
    }
}
export function nextButtonHandle(data) {
    return {
        type: NEXT_BUTTON,
        data
    }
}

export function setErrorStep(data) {
    return {
        type: SET_CURRENT_STEP_ERROR,
        data
    }
}

export function addMoreParams(data) {
    return {
        type: ADD_MORE_PARAMS,
        data
    }
}

export function addAnotherLogin(data) {
    return {
        type: ADD_MORE_PARAMS,
        data
    }
}
function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
}
function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}
export function openRegisterModal() {
    return {
        type: OPEN_REGISTER_MODAL
    }
}
export function closeRegisterModal() {
    return {
        type: CLOSE_REGISTER_MODAL
    }
}

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        body: `username=${creds.username}&password=${creds.password}`,
        credentials: 'same-origin'
        // credentials: 'include'
    }

    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(creds))
        // http://35.167.23.92/scan/login
        // return fetch(BASE_URL+'/scan/login', config)
        return fetch(BASE_URL+'/scan/login', config)
        // return fetch(BASE_URL+'/scan/login',{'mode': 'no-cors'}, config)
            .then(response => {

                if (!response.ok) {
                    // return Promise.reject(user)
                    document.cookie = 'user' + '=; path = /; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    // If there was a problem, we want to
                    let user = {message: 'vikas cookie not set'}
                    dispatch(loginError(user.message))
                } else {
                    // dispatch the error condition
                    document.cookie = 'user=cf995a6ad0c081fcbe314660eb020725; path=/; domain=.webapiskan.com; expires=Mon, 24-Dec-2018 09:51:40 GMT'

                    // If login was successful, set the token in local storage
                    // localStorage.setItem('id_token', user.id_token)

                    // Dispatch the success action
                    let user = {
                        id_token: 'vikas'
                    };
                    dispatch(receiveLogin(user))
                }
                return response.json()
            }).catch(error=>{console.log('error is ',error)})
    }
}

// Logs the user out
export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout())
        document.cookie = 'user' + '=; path = /; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = "/scan/logout";
        localStorage.removeItem('id_token')
        dispatch(receiveLogout())
    }
}

