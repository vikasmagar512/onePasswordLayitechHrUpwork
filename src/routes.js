import React,{Component} from 'react';

import { Route, IndexRoute,Router } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import NotFound from './components/NotFound';

import CSRF from './components/CrossSiteRequestForgery/Container';
import Register from "./components/Register/Register";
import AccessCtrl from "./components/AccessControl/Container";
import {APICtrl} from "./components/ApiHandler/Container";
import Logout from "./components/Logout";

export const getRoutes=(store,dispatch)=>{
    return (
        <Route path="/" component={App}>
            <IndexRoute component={HomePage} />
            <Route path="/scan/cross_site_req_forgery" component={CSRF}/>
            <Route path="/scan/access_control" component={AccessCtrl}/>
            <Route path="/scan/api_handler" component={APICtrl}/>
            <Route path="/scan/register" component={Register} />
            <Route path="/scan/logout" component={Logout} />
            <Route path="*" component={NotFound}/>
        </Route>
    );
}

