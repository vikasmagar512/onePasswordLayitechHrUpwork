import React,{PropTypes,Component} from 'react'

import {connect} from 'react-redux'
import {
    closeModal, openModal, editLoginCredentials, backButtonHandle, nextButtonHandle,
    addMoreParams, setErrorStep, addAnotherLogin, modalInputChange
} from '../../actions/processActions'

import {ModalComponent} from "./Component";

ModalComponent.PropTypes={
    modal:PropTypes.object.isRequired,
    openModal:PropTypes.func.isRequired,
    closeModal:PropTypes.func.isRequired,
    modalInputChange:PropTypes.func.isRequired,
    editLoginCredentials:PropTypes.func.isRequired,
    backButtonHandle:PropTypes.func.isRequired,
    addMoreParams:PropTypes.func.isRequired,
    nextButtonHandle:PropTypes.func.isRequired,
    setErrorStep:PropTypes.func.isRequired,
    componentType:PropTypes.string.isRequired
};

const mapStateToProps=state=> {
    return {
    }
};
const mapDispatchToProps = {
    openModal,
    closeModal,
    modalInputChange,
    editLoginCredentials,
    backButtonHandle,
    nextButtonHandle,
    addMoreParams,
    setErrorStep,
    addAnotherLogin
};
export const ProcessModal = connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
export default ProcessModal
