import React,{PropTypes,Component} from 'react'
import {connect} from 'react-redux'
import {openModal} from "../../actions/processActions";
import {getModalPropsSelector,getApps} from '../../selectors/index'
import {AppsComponent} from './Component'
import {saveAppsModal} from "../../actions/sessionActions";

AppsComponent.propTypes = {
    modal:PropTypes.object.isRequired
};
const mapStateToProps = state => {
    return {
        modal:getModalPropsSelector(state),
        apps:getApps(state)
    }
};
const mapDispatchToProps = {
    openModal,
    saveAppsModal
};
export const Apps = connect(mapStateToProps, mapDispatchToProps)(AppsComponent);
export default Apps
