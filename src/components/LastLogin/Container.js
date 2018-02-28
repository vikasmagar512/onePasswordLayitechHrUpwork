import React,{PropTypes,Component} from 'react'
import {connect} from 'react-redux'
import {inputChange, saveUser} from "../../actions/processActions";
import {LastLoginComponent} from './Component'

LastLoginComponent.propTypes = {
    inputChange:PropTypes.func.isRequired,
    saveUser:PropTypes.func.isRequired
};
const mapStateToProps = state => {
    return {
    }
};
const mapDispatchToProps = {
    inputChange,
    saveUser
};
export const LastLogin = connect(mapStateToProps, mapDispatchToProps)(LastLoginComponent);
export default LastLogin
