import React,{Component,PropTypes} from 'react'
import { Modal} from 'react-bootstrap';
import {connect} from 'react-redux'
import {openRegisterModal,closeRegisterModal,loginUser} from "../actions/sessionActions";
import {getRegisterModalStatusSelector} from "../selectors/index";

export class RegisterComponent extends Component{
    handleClick() {
        const username = this.refs.username;
        const password = this.refs.password;
        const creds = { username: username.value.trim(), password: password.value.trim() };
        this.props.onLoginClick(creds)
    }
    render(){
        const {registerModalOpen,closeRegisterModal,openRegisterModal,loginUser} = this.props
        return (
            <div>
                <Modal className="modal-container" role="document" show={registerModalOpen}>
                    <Modal.Header>
                        <h5 className="modal-title">Register
                            <button type="button" className="close" aria-label="Close" onClick={closeRegisterModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </h5>
                    </Modal.Header>
                    <Modal.Body>
                        <form action="/scan/register" method="post" className="form-inline">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-4">
                                        First Name:
                                    </div>
                                    <div className="col-sm-4">
                                        <input ref='first_name' type="text" size="30" name="first_name"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        Last Name:
                                    </div>
                                    <div className="col-sm-4">
                                        <input type="text" ref='last_name' size="30" name="last_name"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        Email Address (username):
                                    </div>
                                    <div className="col-sm-4">
                                        <input type="text" ref="email_address" size="40" name="email_address"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        Password:
                                    </div>
                                    <div className="col-sm-4">
                                        <input size="30" ref="password" name="password" type="password"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        Retype Password:
                                    </div>
                                    <div className="col-sm-4">
                                        <input size="30" name="password1" type="password"/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Register</button>
                                <button type="button" className="btn btn-secondary" onClick={closeRegisterModal}>Close</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
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