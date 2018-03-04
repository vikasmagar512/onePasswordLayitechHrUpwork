import initialState from './initialState';
import {browserHistory} from 'react-router';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
    CLOSE_REGISTER_MODAL, OPEN_REGISTER_MODAL, UPDATE_APPS_STORE_RESULT, APP_SAVE_FETCH_STATUS,
    OPEN_PROFILE_MODAL, CLOSE_PROFILE_MODAL, SAVE_PROFILE_DATA, PROFILE_SAVE_FETCH_STATUS, UPDATE_PROFILE_STORE_RESULT,
    CLOSE_APPS_MODAL, OPEN_APPS_MODAL, SHOW_TOAST, SET_TOAST
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
const globalState={
    registerModalOpen :false,
    profileModalOpen :false,
    profileData:{
        first_name:'',
        last_name:'',
        middle_name:'',
        phone:'',
        questions:[{"question":"What was your childhood nickname?","question_id":"1"},
            {"question":"In what city did you meet your spouse/significant other?","question_id":"2"},
            {"question":"What is the name of your favorite childhood friend?","question_id":"3"},
            {"question":"What street did you live on in third grade?","question_id":"4"},
            {"question":"What is your oldest siblings birthday month and year? (e.g., January 1900)","question_id":"5"},
            {"question":"What is the middle name of your oldest child?","question_id":"6"},
            {"question":"What is your oldest sibling's middle name?","question_id":"7"},
            {"question":"What school did you attend for sixth grade?","question_id":"8"},
            {"question":"What was your childhood phone number including area code? (e.g., 000-000-0000)","question_id":"9"},
            {"question":"What is your oldest cousin's first and last name?","question_id":"10"},
            {"question":"What was the name of your first stuffed animal?","question_id":"11"},
            {"question":"In what city or town did your mother and father meet?","question_id":"12"},
            {"question":"Where were you when you had your first kiss?","question_id":"13"},
            {"question":"What is the first name of the boy or girl that you first kissed?","question_id":"14"},
            {"question":"What was the last name of your third grade teacher?","question_id":"15"},
            {"question":"In what city does your nearest sibling live?","question_id":"16"},
            {"question":"What is your oldest brothers birthday month and year? (e.g., January 1900)","question_id":"17"},
            {"question":"What is your maternal grandmother's maiden name?","question_id":"18"},
            {"question":"In what city or town was your first job?","question_id":"19"},
            {"question":"What is the name of the place your wedding reception was held?","question_id":"20"},
            {"question":"What is the name of a college you applied to but didn't attend?","question_id":"21"}],
        userQuestions : [
            {"answer":"pattu","question":"What was your childhood nickname?","question_id":"1"},
            {"answer":"senthil","question":"What is the name of your favorite childhood friend?","question_id":"3"},
            {"answer":"rc school","question":"What school did you attend for sixth grade?","question_id":"8"}
        ],
        user_id:'',
        error:'',
        waiting:false,
        isFetching:false,
        success:true
    },
    toastMessage:null
}
const appsStore ={
    apps:[
        {"app_name":"Facebook","logo_url":null,"username":"patta35@gmail.com","url":"https://wwww.facebook.com","app_id":"6","password":"x"},
        {"app_name":"facebook1","logo_url":"/logos/logo_gmail_64px.png","username":"patta@gmail.com","url":"null","app_id":"7","password":"test123"},
        {"app_name":"facebook2","logo_url":null,"username":"patta@gmail.com","url":null,"app_id":"8","password":"test123"},
        {"app_name":"facebook3","logo_url":"/logos/FB-fLogo-Blue-broadcast-2.png","username":"patta@gmail.com","url":"https://wwww.facebook.com","app_id":"9","password":"test123"},{"app_name":"fb1","logo_url":"/logos/logo_gmail_64px.png","username":"patta6@gmail.com","url":null,"app_id":"11","password":"test123"},
        {"app_name":"fb2","logo_url":"/logos/logo_gmail_64px.png","username":"patta3@gmail.com","url":"www.facebook.com","app_id":"13","password":"test123"},
        {"app_name":"fb6","logo_url":null,"username":"patta6@gmail.com","url":"facebookk.com","app_id":"14","password":"test123"},
        {"app_name":"fb7","logo_url":null,"username":"patta6@gmail.com","url":null,"app_id":"15","password":"test123"},
        {"app_name":"fb8","logo_url":null,"username":"patta6@gmail.com","url":"www.facebookk.com","app_id":"16","password":"test123"},
        {"app_name":"fb89","logo_url":null,"username":"patta6@gmail.com","url":"www.facebookk.com","app_id":"17","password":"test123"},
        {"app_name":"facebook12","logo_url":null,"username":"patta@gmail.com","url":"https://www.facebook.com","app_id":"19","password":"test123"},
        {"app_name":"asdfasfasdfasdf","logo_url":null,"username":"patta@gmail.com","url":"","app_id":"22","password":"test123"}
    ],
    modalOpen:false,
    isFetching:false,
    success:true
}

export function globalApp(state=globalState,action) {
    switch (action.type){
        case OPEN_REGISTER_MODAL:
            return {...state,registerModalOpen:true}
        case CLOSE_REGISTER_MODAL:
            return {...state,registerModalOpen:false}
        case SAVE_PROFILE_DATA:
            return {...state,profileData:action.data}
        case CLOSE_PROFILE_MODAL:
            return {...state,profileModalOpen:false}
        case OPEN_PROFILE_MODAL:
            return {...state,profileModalOpen:true}
        case SET_TOAST:
            return {...state,toastMessage:action.data}
        case UPDATE_PROFILE_STORE_RESULT:{
            if(action.result.isError) {
                return {...state,profileData:{...state.profileData,success: false}}
            }else{
                debugger
                return {...state,profileData:{...state.profileData,...action.result.profileData}}
            }
        }
        case PROFILE_SAVE_FETCH_STATUS:{
            return {...state,profileData:{...state.profileData,isFetching : action.status}}
        }
        default:
            return state
    }
}

export const updateAppStore =(state,item)=>{
    let flag=false
    state.apps.map((app,i)=>{
        if(app.app_id===item.app_id) {
            state.apps[i]=item
            flag = true
        }
    })
    return flag
        ? state.apps
        : [...state.apps,item]
}
export function apps(state = appsStore, action) {
  switch(action.type) {
    case UPDATE_APPS_STORE_RESULT:{
        if(action.result.isError) {
            return {...state,success: false}
        }else{
            let k = updateAppStore(state,action.result.item)
            debugger
            return Object.assign({}, state, {
                apps: k,
                success:true
            })
        }
    }
    case CLOSE_APPS_MODAL:
          return {...state,modalOpen:false}
    case OPEN_APPS_MODAL:
          return {...state,modalOpen:true}
    case APP_SAVE_FETCH_STATUS:{
        return {...state,isFetching : action.status};
    }
    default:{
      return state;
    }
  }
}
/*export default function sessionReducer(state = initialState, action) {

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
}*/

