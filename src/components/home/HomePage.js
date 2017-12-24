
import React, {Component} from 'react';
import createReactClass from  'create-react-class';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';


class HomePage extends Component {

  render() {
    let loginButton =null; 
    if (!this.props.isAuthenticated) {
      loginButton = <Link to="login" className="btn btn-primary btn-lg">log in as a test user</Link>;
    }
    return (
      <div>
        {<h2>Inteliment Assignment</h2>}
        <p>React Redux Authentication Application </p>
        {loginButton}
      </div>
    );
  }
}

HomePage.propTypes = {
    isAuthenticated:PropTypes.bool.isRequired
};
function mapStateToProps(state, ownProps) {
  return {isAuthenticated: state.auth.isAuthenticated};
}

export default connect(mapStateToProps)(HomePage);
