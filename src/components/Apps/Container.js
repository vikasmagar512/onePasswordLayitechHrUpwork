import React,{PropTypes,Component} from 'react'
import {connect} from 'react-redux'
import {closeAppsModal, openAppsModal, openModal} from "../../actions/processActions";
import {getModalPropsSelector, getApps, getAppsModalStatusSelector} from '../../selectors/index'
import {AppsComponent} from './Component'
import {saveAppsModal} from "../../actions/sessionActions";

AppsComponent.propTypes = {
};
const mapStateToProps = state => {
    return {
        apps:getApps(state),
        modalOpen:getAppsModalStatusSelector(state)
    }
};
const mapDispatchToProps = {
    openModal,
    saveAppsModal,
    openAppsModal,
    closeAppsModal
};
export const Apps = connect(mapStateToProps, mapDispatchToProps)(AppsComponent);
export default Apps
