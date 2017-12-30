import React,{PropTypes,Component} from 'react'

import {connect} from 'react-redux'
import {openModal, inputChange, saveUser,setAccessControl} from '../../actions/processActions'

import {getModalPropsSelector} from '../../selectors/index'
import {AccessCtrlComponent} from './Component'

AccessCtrlComponent.propTypes = {
    modal:PropTypes.object.isRequired,
    openModal:PropTypes.func.isRequired,
    inputChange:PropTypes.func.isRequired,
    setAccessControl:PropTypes.func.isRequired,
    saveUser:PropTypes.func.isRequired
};
const mapDispatchToProps = {
    openModal,
    inputChange,
    setAccessControl,
    saveUser
};
const mapStateToProps=state=> {
    return {
        modal:getModalPropsSelector(state)
    }
};
export const AccessCtrl = connect(mapStateToProps, mapDispatchToProps)(AccessCtrlComponent);
export default AccessCtrl
