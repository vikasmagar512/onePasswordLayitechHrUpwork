import React,{Component} from 'react';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Route, IndexRoute,Router } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import InfoPage from './components/info/InfoPage';
import NotFound from './components/NotFound';

import AboutPage from './components/about/AboutPage';
import TeamPage from './components/about/TeamPage';
import ContactPage from './components/about/ContactPage';
import ProfilePage from './components/about/ProfilePage';

import LogInPage from './components/LogInPage';
import Root from './components/scriptsMultipurpose';
import auth from './auth/authenticator';

import {handleRedirection} from './handleRedirection';
import {requireAuthentication} from './requireAuthentication';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="login" component={handleRedirection(LogInPage)} />
    <Route path="about" component={requireAuthentication(AboutPage)}>
      <Route path="profile" component={ProfilePage} />
      <Route path="team" component={TeamPage} />
      <Route path="contact" component={ContactPage} />
    </Route>
    <Route path="info" component={InfoPage} />
    <Route path="/scan/cross_site_req_forgery" component={Root} />
    <Route path="*" component={NotFound}/>
  </Route>
);

