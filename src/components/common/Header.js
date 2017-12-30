import React,{Component} from 'react';
import Login from '../Login'
import PropTypes from 'prop-types';
import {Link, IndexLink } from 'react-router';
import {connect} from 'react-redux';
import {logoutUser,loginUser} from "../../actions/sessionActions";
import {openRegisterModal} from "../../actions/processActions";

class Header extends Component {

    render(){
        const { isAuthenticated, errorMessage, loginUser, logoutUser,openRegisterModal} = this.props
        return (
              <div className="row">
                  <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"/>
                          <span className="icon-bar"/>
                          <span className="icon-bar"/>
                      </button>
                      {/*<a className="navbar-brand" href="#">Web Application Vulnerability Testing</a>*/}
                      <IndexLink className="navbar-brand" to="/">Web Application Vulnerability Testing</IndexLink>
                  </div>
                  <div className="navbar-header navbar-right">
                      {isAuthenticated
                        ?
                            <input type="button" className="btn btn-primary" value="Logout" onClick={()=>logoutUser()}/>
                          :
                            <Login onLoginClick={loginUser} openRegisterModal={openRegisterModal} errorMessage={errorMessage}/>
                      }
                  </div>
              </div>
        )
    }
}

Header.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    loginUser:PropTypes.func.isRequired,
    logoutUser:PropTypes.func.isRequired,
    openRegisterModal:PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { auth } = state
    const { isAuthenticated, errorMessage } = auth
    return {
        isAuthenticated,
        errorMessage
    }
}

const mapDispatchToProps = {
    loginUser,
    logoutUser,
    openRegisterModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
