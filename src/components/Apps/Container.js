import React,{PropTypes,Component} from 'react'
import {connect} from 'react-redux'
import {openModal, inputChange, saveUser,setCrossSiteRequestForgery} from "../../actions/processActions";
import {getModalPropsSelector} from '../../selectors/index'
import {AppsComponent} from './Component'

AppsComponent.propTypes = {
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
export const Apps = connect(mapStateToProps, mapDispatchToProps)(AppsComponent);
export default Apps
