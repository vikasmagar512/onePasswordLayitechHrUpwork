import React,{Component} from 'react';

import { Route, IndexRoute,Router } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import NotFound from './components/NotFound';

import Register from "./components/Register/Register";
import Apps from "./components/Apps/Container";
import LastLogin from "./components/LastLogin/Container";
import Logout from "./components/Logout";
import {ProfileModal} from "./components/Profile/ProfileModal";
import ProfileModalContainer from "./components/Profile/ProfileModal";

export const getRoutes=(store,dispatch)=>{
    return (
        <Route path="/" component={App}>
            <IndexRoute component={HomePage} />
            <Route path="/apps-anchor" component={Apps}/>
            <Route path="/last-login-anchor" component={LastLogin }/>
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <Route path="*" component={NotFound}/>
        </Route>
    );
}

