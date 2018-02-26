import React,{PropTypes,Component} from 'react'
import {connect} from 'react-redux'

// import {saveAppsModal} from '../../actions/processActions'

import {AppsModalComponent} from "./Component";

AppsModalComponent.PropTypes={
    modalData:PropTypes.object.isRequired,
    modalOpen:PropTypes.boolean.isRequired,
    saveAppsModal:PropTypes.func.isRequired
};

const mapStateToProps=state=> {
    return {

    }
};
const mapDispatchToProps ={
    // saveAppsModal
}
export const AppsModal = connect(mapStateToProps, mapDispatchToProps)(AppsModalComponent);
export default AppsModal
