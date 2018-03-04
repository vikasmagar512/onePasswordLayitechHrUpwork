import {
    CLOSE_REGISTER_MODAL, OPEN_MODAL, CLOSE_MODAL, MODAL_INPUT_CHANGE, INPUT_CHANGE, OPEN_REGISTER_MODAL, SAVE_USER,
    SAVE_APPS_MODAL, OPEN_PROFILE_MODAL, CLOSE_PROFILE_MODAL,
    OPEN_APPS_MODAL, CLOSE_APPS_MODAL, SHOW_TOAST
} from "./actionTypes";

export const openRegisterModal=() =>({
    type: OPEN_REGISTER_MODAL
})
export const closeRegisterModal=() =>({
    type: CLOSE_REGISTER_MODAL
})
export const openProfileModal=() =>({
    type: OPEN_PROFILE_MODAL
})
export const closeProfileModal=() =>({
    type: CLOSE_PROFILE_MODAL
})
export const openAppsModal=() =>({
    type: OPEN_APPS_MODAL
})
export const closeAppsModal=() =>({
    type: CLOSE_APPS_MODAL
})
export const showToast=(message) =>({
    type: SHOW_TOAST,
    data:message
})

export const openModal=()=>({
    type: OPEN_MODAL
})
export const closeModal=(data)=> ({
    type: CLOSE_MODAL,
    data
})
export const saveAppsModal=(data)=> ({
    type: SAVE_APPS_MODAL,
    data
})

export const modalInputChange=(data)=>({
    type: MODAL_INPUT_CHANGE,
    data
})

export const inputChange=(data)=> ({
    type: INPUT_CHANGE,
    data
})
export const saveUser=(data)=> ({
    type: SAVE_USER,
    data
})
