import { createSelector } from 'reselect'

const getModalProps= state => state.modal
const getAppsProps= state => state.apps.apps
const getRegisterModalStatus= state => state.globalApp.registerModalOpen
const getProfileModalStatus= state => state.globalApp.profileModalOpen
const getToastMessage= state => state.globalApp.toastMessage
const getAppsModalStatus= state => state.apps.modalOpen
const getProfileModalData= state => state.globalApp.profileData

export const getRegisterModalStatusSelector = createSelector(
    getRegisterModalStatus,
    (modalStatus) => {
        return modalStatus
    }
);
export const getAppsModalStatusSelector = createSelector(
    getAppsModalStatus,
    (modalStatus) => {
        return modalStatus
    }
);
export const getProfileModalStatusSelector = createSelector(
    getProfileModalStatus,
    (modalStatus) => {
        return modalStatus
    }
);
export const getToastMessageselector = createSelector(
    getToastMessage,
    (message) => {
        return message
    }
);
export const getProfileModalDataSelector = createSelector(
    getProfileModalData,
    (modalStatus) => {
        return modalStatus
    }
);

export const getModalPropsSelector = createSelector(
    getModalProps,
    (modalProps) => {
        return modalProps
    }
);

export const getApps= createSelector(
    getAppsProps,
    (apps) => {
        // debugger
        console.log('getApps apps ',apps)
        return apps
    }
);
