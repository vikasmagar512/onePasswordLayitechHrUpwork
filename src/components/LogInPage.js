import React,{Component} from 'react';
import createReactClass from  'create-react-class';
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router';

import TextInput from './common/TextInput';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { findDOMNode } from 'react-dom';
import * as sessionActions from '../actions/sessionActions';

let email,password;
class LogInPage extends Component {

  constructor(props) {
    super(props);
    this.state={
      data:{
        email: 'vikasmagar512@gmail.com', 
        password: 'pwd'
      },
      loading:false,
      success:false,
      message:'',
      errors:{
        email:'',
        password:''
      },
      valid:{
        form:true,
        email:true,
        password:true
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.checkError = this.checkError.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    let loginResponse = nextProps.state.session.loginResponse;
    let newState = Object.assign({},this.state);
    newState.loading = false;
    newState.errors = loginResponse.errors;
    newState.message = loginResponse.message;
    newState.success= loginResponse.success;
    this.setState(newState);

    if(newState.success){
      //logged in successfully redirect to about page
      browserHistory.push('/about');
    }
    // setTimeout(function() {}, 5000);
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.errors;
    let emailValid = this.state.valid.email;
    let passwordValid = this.state.valid.password;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;
        fieldValidationErrors.email = emailValid ? '' : 'Please enter valid email.';
        break;
      case 'password':
        passwordValid = value.length > 0;
        fieldValidationErrors.password = passwordValid ? '': ' Please enter your password.';
        break;
      default:
        break;
    }
    let newState = Object.assign({},this.state);
    newState.errors = fieldValidationErrors;
    newState.valid.email= emailValid;
    newState.valid.password= passwordValid;
    this.setState(newState, this.validateForm);
  }
  validateForm() {
      let newState = Object.assign({},this.state);
      newState.valid.form = newState.valid.email && newState.valid.password;
      this.setState(newState);
  }

  onChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    const credentials = this.state.data;
    credentials[field] = value;

    let newState = Object.assign({},this.state);
    newState.data = credentials;
    this.setState(newState, () => { this.validateField(field, value) });
  }

  onSave(event) {
    event.preventDefault();
    let newState = Object.assign({},this.state);
    newState.loading=true;
    newState.errors.email="";
    newState.errors.password=""; 
    this.setState(newState);

    this.props.actions.loginUser(this.state.data);
  }
  checkError(error){
    let wrapperClass = 'input-group';
    if (error && error.length > 0) {
      wrapperClass += " " + 'has-error';
    }
    return wrapperClass;
  }

  render() {
    let errorLabelStyle ={marginLeft:'40px'};
    let submitText = 'Login';
    if(this.state.loading){
      submitText = 'Logging in';
    }
    return (
      
      <div className="container">    
        <div style={{marginTop:'50px'}} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
          <div className="panel panel-info" >
            <div className="panel-heading">
              <div className="panel-title">Sign In</div>
            </div>     
            <div style={{paddingTop:'30px'}} className="panel-body" >
              <div style={{display:'none'}} id="login-alert" className="alert alert-danger col-sm-12"></div>
              <form role="form" id="form">
                <TextInput
                  name="email"
                  label="email"
                  type="email"
                  error= {this.state.errors.email}
                  glyphicon="glyphicon-user"
                  placeholder="username"
                  autofocus = "autoFocus"
                  value={this.state.data.email}
                  onChange={this.onChange}
                />
                <TextInput
                  name="password"
                  label="password"
                  type="password"
                  error= {this.state.errors.password}
                  glyphicon="glyphicon-lock"
                  placeholder="password"
                  autofocus = {null}
                  value={this.state.data.password}
                  onChange={this.onChange}
                  />
                <button type="submit" className="btn btn-default btn-primary" onClick={this.onSave} disabled={!this.state.valid.form || this.state.loading}><i className="fa fa-spinner fa-spin"></i>{submitText}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
/*LogInPage.propTypes = {
  actions:PropTypes.func.isRequired
};*/
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}
function mapStateToProps(state, ownProps) {
  return {state: state};
}
export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
