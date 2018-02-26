import { createSelector } from 'reselect'

const getModalProps= state => state.modal
const getAppsProps= state => state.apps.apps
const getRegisterModalStatus= state => state.globalApp.registerModalOpen

export const getRegisterModalStatusSelector = createSelector(
    getRegisterModalStatus,
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
        debugger
        console.log('getApps apps ',apps)
        return apps
    }
);
