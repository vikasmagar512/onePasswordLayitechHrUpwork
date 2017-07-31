import React,{Component} from 'react';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Route, IndexRoute,Router,browserHistory } from 'react-router';
export function handleRedirection(Component) {
    class RedirectionComponent extends Component {
      componentWillMount () {
        this.checkAuth();
      }
      componentWillReceiveProps (nextProps) {
        this.checkAuth();
      }

      checkAuth () {
        if (this.props.isAuthenticated.session) {
          let redirectAfterLogin = this.props.location.pathname;
          browserHistory.push('/');
          // this.props.router.replace({pathname: '/', state: {redirectAfterLogin: redirectAfterLogin}});
        }
      }

      render () {
        return (
          <div>
            {this.props.isAuthenticated.session === false
              ? <Component {...this.props}/>
              : null
            }
          </div>
        );
      }
    }
    RedirectionComponent.propTypes = {
      isAuthenticated:PropTypes.object.isRequired
    };
    RedirectionComponent.defaultProps = {
      location: {
        pathname: ''
      },
      isAuthenticated:{
        session:false
      }
    };
    RedirectionComponent.propTypes = {
      isAuthenticated:PropTypes.object.isRequired
    };
    function mapStateToProps(state) {
      return {isAuthenticated: state.session};
    }
    return connect(mapStateToProps)(RedirectionComponent);
}

