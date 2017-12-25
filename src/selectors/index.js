import { createSelector } from 'reselect'

const getModalProps= state => state.modal
const getRegisterModalStatus= state => state.globalApp.registerModalOpen

export const getRegisterModalStatusSelector = createSelector(
    getRegisterModalStatus,
    (modalStatus) => {
        console.log('Register modalStatus ',modalStatus)
        return modalStatus
    }
)

export const getModalPropsSelector = createSelector(
    getModalProps,
    (modalProps) => {
        console.log(modalProps)
        return modalProps
    }
)
