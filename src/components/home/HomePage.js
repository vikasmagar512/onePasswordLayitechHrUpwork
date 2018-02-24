
import React, {Component} from 'react';
import createReactClass from  'create-react-class';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';


class HomePage extends Component {

  render() {
    return (
      <div>
        {<h2>One Password</h2>}
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
