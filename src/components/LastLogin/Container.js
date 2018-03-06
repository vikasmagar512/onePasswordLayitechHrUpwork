import React,{PropTypes,Component} from 'react'
import {connect} from 'react-redux'
import {inputChange, saveUser} from "../../actions/processActions";
import {LastLoginComponent} from './Component'
import {getLastLoginLogs} from "../../actions/sessionActions";
import {getLastLoginSelector} from "../../selectors";

LastLoginComponent.propTypes = {
    inputChange:PropTypes.func.isRequired,
    saveUser:PropTypes.func.isRequired,
    getLastLoginLogs:PropTypes.func.isRequired
};
const mapStateToProps = state => {
    return {
        logs:getLastLoginSelector(state)
    }
};
const mapDispatchToProps = {
    inputChange,
    saveUser,
    getLastLoginLogs
};
export const LastLogin = connect(mapStateToProps, mapDispatchToProps)(LastLoginComponent);
export default LastLogin
