import React,{PropTypes,Component} from 'react'

import {connect} from 'react-redux'
import {setAPIHandler,openModal, inputChange, saveUser} from '../../actions/processActions'
import {getModalPropsSelector} from '../../selectors/index'

import {APIHandlerComponent} from './Component'


APIHandlerComponent.propTypes = {
    modal:PropTypes.object.isRequired,
    openModal:PropTypes.func.isRequired,
    inputChange:PropTypes.func.isRequired,
    setAPIHandler:PropTypes.func.isRequired,
    saveUser:PropTypes.func.isRequired
};
const mapStateToProps=state=> {
    return {
        modal:getModalPropsSelector(state)
    }
}
const mapDispatchToProps ={
    openModal,
    inputChange,
    setAPIHandler,
    saveUser
};
export const APICtrl = connect(mapStateToProps, mapDispatchToProps)(APIHandlerComponent);
export default APICtrl
