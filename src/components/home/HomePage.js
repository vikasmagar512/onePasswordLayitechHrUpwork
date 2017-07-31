
import React, {Component} from 'react';
import createReactClass from  'create-react-class';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';


class HomePage extends Component {

  render() {
    let loginButton =null; 
    if (!this.props.logged_in.session ) {
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
  logged_in:PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
  return {logged_in: state.session};
}

export default connect(mapStateToProps)(HomePage);
