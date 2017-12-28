import { createSelector } from 'reselect'

const getModalProps= state => state.modal
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
