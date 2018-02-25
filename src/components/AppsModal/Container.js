import React,{PropTypes,Component} from 'react'
import {connect} from 'react-redux'

import {
    closeModal, saveAppsModal
} from '../../actions/processActions'

import {AppsModalComponent} from "./Component";

AppsModalComponent.PropTypes={
    modalData:PropTypes.object.isRequired,
    modalOpen:PropTypes.boolean.isRequired,
    closeModal:PropTypes.func.isRequired,
    saveAppsModal:PropTypes.func.isRequired
};

const mapStateToProps=state=> {
    return {

    }
};
const mapDispatchToProps ={
        closeModal,
        saveAppsModal
}
export const AppsModal = connect(mapStateToProps, mapDispatchToProps)(AppsModalComponent);
export default AppsModal
