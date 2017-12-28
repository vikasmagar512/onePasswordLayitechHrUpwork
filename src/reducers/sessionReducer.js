import initialState from './initialState';
import {browserHistory} from 'react-router';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, OPEN_MODAL,
    CLOSE_MODAL, INPUT_CHANGE, MODAL_INPUT_CHANGE, EDIT_LOGIN_CREDENTIALS, BACK_BUTTON, NEXT_BUTTON, ADD_MORE_PARAMS,
    CLOSE_REGISTER_MODAL, OPEN_REGISTER_MODAL, CROSS_SITE_RQ_FORGERY, ACCESS_CONTROL, API_HANDLER,
    SET_CURRENT_STEP_ERROR
} from '../actions/actionTypes'
import {formAndAddStep3Object, formAndAddStep3ObjectForAPI} from '../helperFunc'
import {Credentials, crosssite} from "../components/helpers";
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
    registerModalOpen :false
}
const modalState= {
    login_required:false,
    url:'',
    url_id:'',
    service:crosssite,
    steps:[
        {
            userrole:new Set(
                /*'admin'*/
            )
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
    crosssite : { activeRole:'',currentstep: 1,currentWarning: false, limit: 5, edit_login: 0 }
}
export function globalApp(state=globalState,action) {
    switch (action.type){
        case OPEN_REGISTER_MODAL:
            return {...state,registerModalOpen:true}
        case CLOSE_REGISTER_MODAL:
            return {...state,registerModalOpen:false}
        default:
            return state
    }
}
/*
steps[0]['userrole'].add(e.target.value)
steps[1]['login_type'][selectedUserrole]=''
steps[2]['success_url'][selectedUserrole]=''
crosssite.activeRole=selectedUserrole
steps[3][selectedUserrole] = this.formAndAddStep3Object(selectedUserrole)
*/
const getModifiedSteps=(steps)=>{
    let k = steps.map((step,index)=>{
        switch (index){
            case 0:
                return {...step,userrole:new Set().add('no_role')}
            case 1:
                return {...step,login_type:{...step.login_type,no_role:''}}
            case 2:
                return {...step,success_url:{...step.success_url,no_role:''}}
            case 3:{
                let no_role = formAndAddStep3Object()
                return {...step,no_role}
            }
            default:
                return {...step}
        }
    })
    return k
}

const getAPIModifiedSteps=(steps)=>{
    let stepsModified = getModifiedSteps(steps)
    let stepsAPIModified = stepsModified.map((step,index)=>{
        if(index===1){
            return {...step,login_type:{...step.login_type,no_role:Credentials}}
        }else if(index===3){
            let k = formAndAddStep3ObjectForAPI()
            return {...step,no_role:k}
        } else{
            return {...step}
        }
    })
    return stepsAPIModified
}
export function modal(state = modalState, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return {...state,modalOpen:true}
        case CLOSE_MODAL:
            return {...state,modalOpen:false,crosssite:{...state.crosssite,currentstep:1,activeRole:""}}
        case CROSS_SITE_RQ_FORGERY:
            return {
                ...state,
                crosssite:{...state.crosssite,currentstep:2,activeRole:"no_role"},
                steps:[...getModifiedSteps(state.steps)]
            }
        case ACCESS_CONTROL:
            return modalState
        case API_HANDLER:
            return {
                ...state,
                request_type:'',
                crosssite:{...state.crosssite,currentstep:4,activeRole:"no_role"},
                steps:[...getAPIModifiedSteps(state.steps)]
            }
        case MODAL_INPUT_CHANGE: {
            let crosssite = action.data.crosssite
            return {...state,crosssite:{...state.crosssite,...crosssite},steps:action.data.steps}
        }
        case EDIT_LOGIN_CREDENTIALS:{
            let crosssite = action.data
            let k = {...state,crosssite:{...state.crosssite,...crosssite}}
            return k
        }
        case INPUT_CHANGE:
            return {...state,...action.data}
        case BACK_BUTTON:
            return {...state,crosssite:action.data}
        case NEXT_BUTTON:
            return {...state,crosssite:action.data}
        case SET_CURRENT_STEP_ERROR:
        // {...this.props.modal.crosssite,currentWarning:true}
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

