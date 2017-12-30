import {
    CROSS_SITE_RQ_FORGERY, ACCESS_CONTROL, CLOSE_REGISTER_MODAL, API_HANDLER, SET_CURRENT_STEP_ERROR, ADD_ANOTHER_LOGIN,
    OPEN_MODAL, CLOSE_MODAL, MODAL_INPUT_CHANGE, INPUT_CHANGE, BACK_BUTTON, ADD_MORE_PARAMS, EDIT_LOGIN_CREDENTIALS,
    NEXT_BUTTON, OPEN_REGISTER_MODAL,SAVE_USER
} from "./actionTypes";

export const openRegisterModal=() =>({
    type: OPEN_REGISTER_MODAL
})
export const closeRegisterModal=() =>({
    type: CLOSE_REGISTER_MODAL
})
export const openModal=()=>({
    type: OPEN_MODAL
})
export const closeModal=(data)=> ({
    type: CLOSE_MODAL,
    data
})

export const modalInputChange=(data)=>({
    type: MODAL_INPUT_CHANGE,
    data
})

export const editLoginCredentials=(data)=> ({
    type: EDIT_LOGIN_CREDENTIALS,
    data
})
export const inputChange=(data)=> ({
    type: INPUT_CHANGE,
    data
})

export const backButtonHandle=(data)=> ({
    type: BACK_BUTTON,
    data
})
export const nextButtonHandle=(data)=> ({
    type: NEXT_BUTTON,
    data
})

export const setErrorStep=(data)=> ({
    type: SET_CURRENT_STEP_ERROR,
    data
})

export const addMoreParams=(data)=> ({
    type: ADD_MORE_PARAMS,
    data
})

export const addAnotherLogin=(data)=> ({
    type: ADD_ANOTHER_LOGIN,
    data
})
export const saveUser=(data)=> ({
    type: SAVE_USER,
    data
})
export const setCrossSiteRequestForgery=()=>({
    type: CROSS_SITE_RQ_FORGERY
})

export const setAccessControl=()=> ({
    type: ACCESS_CONTROL
})
export const setAPIHandler=()=>({
    type: API_HANDLER
})
