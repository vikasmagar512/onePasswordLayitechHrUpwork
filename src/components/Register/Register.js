import React,{Component,PropTypes} from 'react'
import { Modal} from 'react-bootstrap';
import {connect} from 'react-redux'
import {openRegisterModal,closeRegisterModal,loginUser} from "../../actions/sessionActions";
import {getRegisterModalStatusSelector} from "../../selectors/index";

export class RegisterComponent extends Component{
    handleClick() {
        const username = this.refs.username;
        const password = this.refs.password;
        const creds = { username: username.value.trim(), password: password.value.trim() };
        this.props.loginUser(creds)
    }
    render(){
        const {registerModalOpen,closeRegisterModal,openRegisterModal,loginUser} = this.props
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
                        <button type="button" className="btn btn-primary" onClick={openRegisterModal}>Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        registerModalOpen:getRegisterModalStatusSelector(state)
    }
}
RegisterComponent.PropTypes={
    openRegisterModal:PropTypes.func.isRequired,
    closeRegisterModal:PropTypes.func.isRequired,
    loginUser:PropTypes.func.isRequired,
    registerModalOpen:PropTypes.bool.isRequired
}
const mapDispatchToProps = (dispatch,getState) => {
    return {
        loginUser:(creds)=>{
            dispatch(loginUser(creds))
        },
        openRegisterModal:()=>{
            dispatch(openRegisterModal())
        },
        closeRegisterModal:()=>{
            dispatch(closeRegisterModal())
        }
    }
}
export const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);

export default Register