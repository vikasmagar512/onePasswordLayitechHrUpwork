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
import CSRF from './components/crossSiteRequestForgery';
import auth from './auth/authenticator';

import {handleRedirection} from './handleRedirection';
import {requireAuthentication} from './requireAuthentication';
import Register from "./components/Register/Register";
import {setAccessControl, setCrossSiteRequestForgery} from './actions/actions'
import AccessCtrl from "./components/accessControl";
import {API_HANDLER} from "./actions/actionTypes";
import {APICtrl} from "./components/apiHandler";
export const setModalStore =(store,route)=> {
    let state = store.getState()
    if(route==='access_control'){
        debugger
        store.dispatch(setAccessControl(state))
    }else if(route==='cross_site_req_forgery'){
        debugger
        store.dispatch(setCrossSiteRequestForgery(state))
    }
}
export const getRoutes=(store,dispatch)=>{
    return (
        <Route path="/" component={App}>
            <IndexRoute component={HomePage} />
            <Route path="login" component={handleRedirection(LogInPage)} />
            <Route path="about" component={requireAuthentication(AboutPage)}>
                <Route path="profile" component={ProfilePage} />
                <Route path="team" component={TeamPage} />
                <Route path="contact" component={ContactPage} />
            </Route>
            <Route path="info" component={InfoPage} />
            {/*<Route path="/scan/cross_site_req_forgery" component={CSRF} onEnter={setModalStore(store,'cross_site_req_forgery')}/>*/}
            <Route path="/scan/cross_site_req_forgery" component={CSRF}/>
            {/*<Route path="/scan/access_control" component={AccessCtrl} onEnter={setModalStore(store,'access_control')}/>*/}
            <Route path="/scan/access_control" component={AccessCtrl}/>
            <Route path="/scan/api_handler" component={APICtrl}/>
            <Route path="/scan/register" component={Register} />
            <Route path="*" component={NotFound}/>
        </Route>
    );
}

