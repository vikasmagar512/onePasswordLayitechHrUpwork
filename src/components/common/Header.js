import React,{Component} from 'react';
import createReactClass from  'create-react-class';

import PropTypes from 'prop-types';
import {Link, IndexLink } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../../actions/sessionActions';


class Header extends Component {
  constructor(props) {
    super();
    this.logOut = this.logOut.bind(this);
  }

  logOut(event) {
    event.preventDefault();
    this.props.actions.logOutUser();
  }
  render() {
      return (
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <IndexLink className="navbar-brand" to="/">Assignment</IndexLink>
            </div>
            <ul className="nav navbar-nav">
              {this.props.logged_in.session && <li><Link to="/about"> About</Link></li>}
              <li><Link to="/info"> Info</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {this.props.logged_in.session 
                ?  
                  <li><a href="Logout" onClick={this.logOut}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li> 
                :
                 <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>}
            </ul>
          </div>
        </nav> 
    );
  }
}

Header.propTypes = {
  actions: PropTypes.object.isRequired,
  logged_in:PropTypes.object.isRequired
};
Header.defaultProps = {
  logged_in:{
    session:false
  }
};

function mapStateToProps(state, ownProps) {
  return {logged_in: state.session};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
