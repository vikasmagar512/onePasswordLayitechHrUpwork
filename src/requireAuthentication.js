import React,{Component} from 'react';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Route, IndexRoute,Router,browserHistory} from 'react-router';

export function requireAuthentication(Component) {
    class AuthenticatedComponent extends Component {
      componentWillMount () {
        this.checkAuth();
      }
      componentWillReceiveProps (nextProps) {
        this.checkAuth();
      }

      checkAuth () {
        if (!this.props.isAuthenticated.session) {
          let redirectAfterLogin = this.props.location.pathname;
          browserHistory.push('/login');
          // this.context.router.replace({pathname: '/login', state: {redirectAfterLogin: redirectAfterLogin}});
        }
      }

      render () {
        return (
          <div>
            {this.props.isAuthenticated.session === true
              ? <Component {...this.props}/>
              : null
            }
          </div>
        );
      }
    }
    AuthenticatedComponent.propTypes = {
      isAuthenticated:PropTypes.object.isRequired
    };
    /*AuthenticatedComponent.contextTypes = {
      router: PropTypes.func.isRequired
    };*/
    AuthenticatedComponent.defaultProps = {
      location: {
        pathname: ''
      },
      isAuthenticated:{
        session:false
      }
    };
    function mapStateToProps(state) {
      return {isAuthenticated: state.session};
    }

    return connect(mapStateToProps)(AuthenticatedComponent);
}
