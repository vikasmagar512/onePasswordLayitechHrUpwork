
import React,{Component} from 'react';
import {connect} from 'react-redux';

import PropTypes from 'prop-types'
import Header from './common/Header';
import {getRegisterModalStatusSelector, getProfileModalStatusSelector,
    getToastMessageselector
} from "../selectors/index";
import RegisterModal from './Register/RegisterModal'
import ProfileModal from './Profile/ProfileModal'
import {loginUser} from "../actions/actions";
import {closeRegisterModal, openRegisterModal,closeProfileModal, openProfileModal,setToast} from "../actions/processActions";

class AppComponent extends Component {
    constructor(props){
        super(props)
        this.snackbar = null
    }
    componentDidMount(){
        this.snackbar = document.getElementById("snackbar")
    }
    render() {
        const {registerModalOpen,profileModalOpen,openProfileModal,toastMessage,children} = this.props
        if(toastMessage && this.snackbar){
            var that = this
            this.snackbar.className = "show";
            setTimeout(function(){
                this.snackbar.className = "";
                that.props.setToast(null)
            }, 3000);
        }
        const Footer = (
            <footer>
                <div className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-collapse collapse" id="footer-body">
                            <ul className="nav navbar-nav">
                                <li><a href="#">Browse Our Library</a></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Contact Us</a></li>
                                <li><a href="#">Our Partners</a></li>
                                <li><a href="#">User Review</a></li>
                                <li><a href="#">Terms &amp; Conditions</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#footer-body">
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                            </button>
                            <ul className="footer-bar-btns visible-xs">
                                <li><a href="#" className="btn" title="History"><i className="fa fa-2x fa-clock-o blue-text"/></a></li>
                                <li><a href="#" className="btn" title="Favourites"><i className="fa fa-2x fa-star yellow-text"/></a></li>
                                <li><a href="#" className="btn" title="Subscriptions"><i className="fa fa-2x fa-rss-square orange-text"/></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        )
        return (
            <div>
                <div className="container-fluid">
                    <div id="snackbar">{toastMessage}</div>
                    <Header/>
                    <div className="row">
                        <div className="col-sm-3 col-lg-2">
                            <nav className="navbar navbar-default navbar-fixed-side">
                                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                    <ul className="nav navbar-nav">
                                        <li className="nav-item"><a href="/apps-anchor">Apps</a></li>
                                        <li className="nav-item"><a href="/last-login-anchor">Last Logins</a></li>
                                        <li className="nav-item"><a href="/restrict-ip-anchor">Restrict IP</a></li>
                                        <li className="nav-item"><a onClick={()=>openProfileModal()}>Profile</a></li>
                                        <li className="nav-item"><a href="change-pwd-anchor">Change Password</a></li>
                                        <li className="nav-item"><a href="/help-anchor">Help</a></li>
                                        </ul>
                                </div>
                            </nav>
                        </div>
                        <div id="root">
                            {
                                registerModalOpen && <RegisterModal {...this.props}/>
                                ||
                                profileModalOpen && <ProfileModal {...this.props}/>
                            }
                            {children}
                        </div>
                    </div>
                </div>
                {Footer}
            </div>
        );
    }
}
const mapStateToProps=(state,ownProps)=>{
    console.log('mapStateToProps app state is',state)
    return {
        registerModalOpen:getRegisterModalStatusSelector(state),
        profileModalOpen:getProfileModalStatusSelector(state),
        toastMessage:getToastMessageselector(state)
    }
}
const mapDispatchToProps={
        loginUser,
        openRegisterModal,
        closeRegisterModal,
        openProfileModal,
        closeProfileModal,
        setToast
}
AppComponent.propTypes = {
    registerModalOpen:PropTypes.bool.isRequired,
    profileModalOpen:PropTypes.bool.isRequired,
    openProfileModal:PropTypes.func.isRequired,
    setToast:PropTypes.func.isRequired,
    toastMessage:PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
};
export const App = connect(mapStateToProps,mapDispatchToProps)(AppComponent)
export default App;