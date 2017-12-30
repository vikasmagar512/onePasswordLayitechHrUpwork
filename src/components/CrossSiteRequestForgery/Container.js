import React,{PropTypes,Component} from 'react'
import {connect} from 'react-redux'
import {openModal, inputChange, saveUser,setCrossSiteRequestForgery} from "../../actions/processActions";
import {getModalPropsSelector} from '../../selectors/index'
import {CSRFComponent} from './Component'

CSRFComponent.propTypes = {
    modal:PropTypes.object.isRequired,
    inputChange:PropTypes.func.isRequired,
    openModal:PropTypes.func.isRequired,
    setCrossSiteRequestForgery:PropTypes.func.isRequired,
    saveUser:PropTypes.func.isRequired
};
const mapStateToProps = state => {
    return {
        modal:getModalPropsSelector(state)
    }
};
const mapDispatchToProps = {
    openModal,
    inputChange,
    setCrossSiteRequestForgery,
    saveUser
};
export const CSRF = connect(mapStateToProps, mapDispatchToProps)(CSRFComponent);
export default CSRF
