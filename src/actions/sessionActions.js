import {closeAppsModal, setToast} from "./processActions";

const BASE_URL ='http://52.38.226.152'
import {
    LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGOUT_SUCCESS, LOGOUT_REQUEST,
    UPDATE_APPS_STORE_RESULT, APP_SAVE_FETCH_STATUS, PROFILE_SAVE_FETCH_STATUS, UPDATE_PROFILE_STORE_RESULT,
    UPDATE_LOGS_STORE_RESULT, LOGS_SAVE_FETCH_STATUS
} from "./actionTypes";

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

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out


function saveAppsModalStatus(item,isError) {
    return {
        type: UPDATE_APPS_STORE_RESULT ,
        result:{item,isError}
    }
}
function saveLastLoginLogsStatus(logs,isError) {
    return {
        type: UPDATE_LOGS_STORE_RESULT,
        result:{logs,isError}
    }
}
function fetchingAppsModal(status=false) {
    return {
        type: APP_SAVE_FETCH_STATUS,
        status
    }
}
function fetchingLastLoginLogs(status=false) {
    return {
        type: LOGS_SAVE_FETCH_STATUS,
        status
    }
}
function saveProfileModalStatus(profileData,isError) {
    return {
        type: UPDATE_PROFILE_STORE_RESULT,
        result:{profileData,isError}
    }
}
function fetchingProfileModal(status=false) {
    return {
        type: PROFILE_SAVE_FETCH_STATUS,
        status
    }
}
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
        body: `username=${creds.username}&password=${creds.password}`
        // credentials: 'same-origin'
        // credentials: 'include'
    }

    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(creds))
        // http://35.167.23.92/scan/login
        // return fetch(BASE_URL+'/scan/login', config)
        return fetch(BASE_URL+'/scan/login',{'mode': 'no-cors'}, config)
            .then(response => {
                // document.cookie = 'user=c79ce24b4ff58df856ead712af938797; path=/; domain=.webapiskan.com; expires=Mon, 24-Dec-2018 09:51:40 GMT'
                // document.cookie = 'user=c79ce24b4ff58df856ead712af938797; path=/; domain=localhost; expires=Mon, 24-Dec-2018 09:51:40 GMT'
                document.cookie ='session=5cd958324944a496da79b4bbbca9c400f99545ccee47a87b175c0348f49cf5cc; user=c4b3735e61030787c0bc9303958b7ec975a28715d454b85e589058d15825e33b'
                let user = {
                    id_token: 'vikas'
                };
                dispatch(receiveLogin(user))
                /*debugger
                if (!response.ok) {
                    // return Promise.reject(user)
                    // document.cookie = 'user' + '=; path = /; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    // If there was a problem, we want to
                    let user = {message: 'vikas cookie not set'}
                    // document.cookie = 'user=c79ce24b4ff58df856ead712af938797; path=/; domain=.webapiskan.com; expires=Mon, 24-Dec-2018 09:51:40 GMT'
                    document.cookie = 'user=c79ce24b4ff58df856ead712af938797; path=/; domain=localhost; expires=Mon, 24-Dec-2018 09:51:40 GMT'
                    dispatch(loginError(user.message))
                } else {
                    // dispatch the error condition
                    document.cookie = 'user=c79ce24b4ff58df856ead712af938797; path=/; domain=.webapiskan.com; expires=Mon, 24-Dec-2018 09:51:40 GMT'
*/
                    // If login was successful, set the token in local storage
                    // localStorage.setItem('id_token', user.id_token)

                    // Dispatch the success action
                    // let user = {
                    //     id_token: 'vikas'
                    // };
                  /*  dispatch(receiveLogin(user))
                }*/
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

export function saveAppsModal(data) {
    /*data ={
        app_name:'sdf',
        app_url:'',
        username:'',
        password:'',
        op:'add_app'
    }*/
    let form_data = new FormData();
    for ( let key in data ) {
        form_data.append(key, data[key]);
    }
    // let form_data = data

    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        body: form_data
        // credentials: 'same-origin'
    }
    debugger
    return dispatch => {
        dispatch(fetchingAppsModal(true))
        return fetch(BASE_URL+'/onepassword/app',{'mode': 'no-cors'}, config)
        .then((response) => {
            if (!response.ok) {
                dispatch(fetchingAppsModal(false))
                throw Error(response.statusText);
            }
            return response;
        })
        .then((response) => response.json())
        .then((response) => {
            dispatch(saveAppsModalStatus(response.item,false))
            dispatch(closeAppsModal())
        })
        // .catch((error) => dispatch(saveAppsModalStatus(null,true)))
        .catch((error) => {
            dispatch(saveAppsModalStatus(data,false))
            dispatch(setToast(`couldn't connect to server. Please try again later`))
        })
   }
}

export function getLastLoginLogs() {
    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        // body: urlEncodeded
        // credentials: 'same-origin'
    }
    var logs = [
        {"location": null, "ip_address": "67.162.80.128", "date": "2017-12-23 17:23:06"},
        {"location": null, "ip_address": "67.162.80.128", "date": "2017-12-24 22:41:12"},
        {"location": null, "ip_address": "67.162.80.128", "date": "2017-12-25 04:04:04"}
    ]
    debugger
    return dispatch => {
        dispatch(fetchingLastLoginLogs(true))
        return fetch(BASE_URL+'/onepassword/log',{'mode': 'no-cors'}, config)
            .then((response) => {
                if (!response.ok) {
                    dispatch(fetchingLastLoginLogs(false))
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((response) => {
                    dispatch(saveLastLoginLogsStatus(response.logs,false))
                }
            )
            // .then((response) => dispatch(saveProfileModalStatus(response.item,false)))
            // .catch((error) => dispatch(saveProfileModalStatus(null,true)))
            .catch((error) => dispatch(saveLastLoginLogsStatus(logs,false)))
    }
}

export function saveProfileModal({payload,urlEncodeded}) {
    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        body: urlEncodeded
        // credentials: 'same-origin'
    }
    debugger
    return dispatch => {
        dispatch(fetchingProfileModal(true))
        return fetch(BASE_URL+'/onepassword/user',{'mode': 'no-cors'}, config)
            .then((response) => {
                if (!response.ok) {
                    dispatch(fetchingProfileModal(false))
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((response) => {
                    dispatch(saveProfileModalStatus(payload,false))
                    dispatch(closeAppsModal())
                }
            )
            // .then((response) => dispatch(saveProfileModalStatus(response.item,false)))
            // .catch((error) => dispatch(saveProfileModalStatus(null,true)))
            .catch((error) => dispatch(saveProfileModalStatus(payload,false)))
    }
}
