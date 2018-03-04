import React, { Component, PropTypes } from 'react'
export default class Login extends Component {
    handleClick() {
        const username = this.refs.username;
        const password = this.refs.password;
        const creds = { username: username.value.trim(), password: password.value.trim() };
        this.props.onLoginClick(creds)
    }
  render() {
    const { errorMessage,openRegisterModal} = this.props;
    const  username ="patta@gmail.com"
    const  password ="test123"
    return (
        <form className="form-inline">
            <ul className="nav navbar-nav navbar-right" id="login-ul">
                <li className="nav-item"><span>Username</span></li>
                <li className="nav-item">
                    <input type='text' ref='username' className="form-control" style={{ marginRight: '5px' }} placeholder='Username' defaultValue={username}/>
                </li>
                <li className="nav-item"><span>Password</span></li>
                <li className="nav-item">
                    <input type='password' ref='password' className="form-control" style={{ marginRight: '5px' }} placeholder='Password' defaultValue ={password}/>
                </li>
                <li className="nav-item">
                    <input type="button" className="btn btn-primary" value="Login" onClick={() => this.handleClick()} />
                </li>
                <li className="nav-item"><button type="button" className="btn btn-primary" onClick={()=>openRegisterModal()}>Register</button></li>
                {errorMessage &&
                    <p style={{color:'red'}}>{errorMessage}</p>
                }
            </ul>
        </form>
    )
      /*return(
          <div>
              <form action="#" className="form-inline">
                  <ul className="nav navbar-nav navbar-right" id="login-ul">
                      <li className="nav-item"><span>Username</span></li>
                      <li className="nav-item"><input type="text" name="username" value="abc@example.com" onfocus="if(this.value == 'abc@example.com') { this.value = ''; }"/></li>
                      <li className="nav-item"><span>Password</span></li>
                      <li className="nav-item"><input type="password" name="password" value="password" onfocus="if(this.value == 'password') { this.value = ''; }"/></li>
                      <li className="nav-item"><input type="submit" id="login-button" className="btn btn-primary" value="Login"/></li>
                      <li className="nav-item"><button type="button" className="btn btn-primary" >Register</button></li>
                  </ul>
              </form>
              <a id="forgot-pwd" className="forgotpwd" href="#">Forgot Password?</a>
          </div>
      )*/
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
    openRegisterModal: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired
};