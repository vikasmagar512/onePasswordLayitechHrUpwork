import React,{Component} from 'react';

import { Route, IndexRoute,Router } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import NotFound from './components/NotFound';

import CSRF from './components/CrossSiteRequestForgery/Container';
import Register from "./components/Register/Register";
import AccessCtrl from "./components/AccessControl/Container";
import Apps from "./components/Apps/Container";
import LastLogin from "./components/LastLogin/Container";
import {APICtrl} from "./components/ApiHandler/Container";
import Logout from "./components/Logout";

export const getRoutes=(store,dispatch)=>{
    return (
        <Route path="/" component={App}>
            <IndexRoute component={HomePage} />
            <Route path="/apps-anchor" component={Apps}/>
            <Route path="/last-login-anchor" component={LastLogin }/>
            <Route path="/cross_site_req_forgery" component={CSRF}/>
            <Route path="/access_control" component={AccessCtrl}/>
            <Route path="/api_handler" component={APICtrl}/>
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <Route path="*" component={NotFound}/>
        </Route>
    );
}

