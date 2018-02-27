import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {openProfileModal,closeProfileModal} from "../../actions/processActions";
import {loginUser} from "../../actions/sessionActions";
import {getProfileModalStatusSelector} from "../../selectors/index";

export class ProfileComponent extends Component{
    handleClick() {
        const username = this.refs.username;
        const password = this.refs.password;
        const creds = { username: username.value.trim(), password: password.value.trim() };
        this.props.loginUser(creds)
    }
    render(){
        const {openProfileModal} = this.props
        return (
            <div className="col-sm-9">
                <h1>Sign In / Sign Up</h1>
                <div className="alert alert-danger">
                    Email address is not valid
                </div>
                <form action="/scan/login" method="post" className="form-signin">
                    <div className="form-group">
                        <span>Username</span>
                        <input type="text" ref='username' name="username" defaultValue="abc@example.com" />
                    </div>
                    <div className="form-group">
                        <span>Password</span>
                        <input type="password" ref='password' name="password" defaultValue="password"/>
                    </div>
                    <div className="align-center">
                        <input type="button" className="btn btn-primary" value="Login" onClick={() => this.handleClick()} />
                        <button type="button" className="btn btn-primary" onClick={openProfileModal}>Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        profileModalOpen:getProfileModalStatusSelector(state)
    }
}
ProfileComponent.PropTypes={
    openProfileModal:PropTypes.func.isRequired,
    closeProfileModal:PropTypes.func.isRequired,
    loginUser:PropTypes.func.isRequired,
    registerModalOpen:PropTypes.bool.isRequired
}
const mapDispatchToProps = {
    loginUser,
    openProfileModal,
    closeProfileModal
}
export const Register = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);

export default Register