
import React,{Component} from 'react';
import {connect} from 'react-redux';

import PropTypes from 'prop-types'
import Header from './common/Header';
import {getRegisterModalStatusSelector} from "../selectors/index";
import Register from "./Register";

class AppComponent extends Component {
  render() {
      const {registerModalOpen,children} = this.props
    return (
        <div className="container-fluid">
            <Header/>
            <div className="row">
                <div className="col-sm-3 col-lg-2">
                    <nav className="navbar navbar-default navbar-fixed-side">
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li className="nav-item "><a href="/scan/host">Host Info</a></li>
                                <li className="nav-item" ><a href="/scan/webserver">Check HTTP Server</a></li>
                                {/*<!--<li className="nav-item"><a href="/scan/broken_links">Check Broken Links</a></li> -->*/}
                                {/*<!--<li className="nav-item "><a href="/scan/valid_html">Validate HTML</a></li>-->*/}
                                <li className="nav-item "><a href="/scan/port_scan">Port Scan</a></li>
                                <li className="nav-item "><a href="/scan/nmap_scan">Ping Sweep</a></li>
                                <li className="nav-item "><a href="/scan/cross-site-scripting">Cross-Site Scripting</a></li>
                                <li className="nav-item active"><a href="/scan/cross_site_req_forgery">Cross-Site Request Forgery</a></li>
                                <li className="nav-item "><a href="/scan/access_control">Missing Function Level Access Control</a></li>
                                {/*<!--<li className="nav-item "><a href="/scan/vuln_scan">Blind SQL Injection</a></li>-->*/}
                                <li className="nav-item "><a href="/scan/api_handler">API Handler</a></li>
                                <li className="nav-item "><a href="/scan/sqlmap">Run SQLMap</a></li>
                                <li className="nav-item "><a href="/scan/kali_scan">Run Other Kali Vulnerability Tools</a></li>
                                <li className="nav-item "><a href="/scan/myjobs">My Jobs</a></li>
                                <li className="nav-item"><a href="/scan/help">Help</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div id="root">
                    {!registerModalOpen
                        ?
                            children
                        :
                            <Register/>
                    }
                </div>
            </div>
            <footer>
                <div className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-collapse collapse" id="footer-body">
                            <ul className="nav navbar-nav">
                                <li><a href="#">Browse Our Library</a></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Contact Us</a></li>
                                <li><a href="#">Our Partners</a></li>
                                <li><a href="#">User Review</a></li>
                                <li><a href="#">Terms &amp; Conditions</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#footer-body">
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                            </button>
                            <ul className="footer-bar-btns visible-xs">
                                <li><a href="#" className="btn" title="History"><i className="fa fa-2x fa-clock-o blue-text"/></a></li>
                                <li><a href="#" className="btn" title="Favourites"><i className="fa fa-2x fa-star yellow-text"/></a></li>
                                <li><a href="#" className="btn" title="Subscriptions"><i className="fa fa-2x fa-rss-square orange-text"/></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
  }
}
const mapStateToProps=(state,ownProps)=>{
    console.log('mapStateToProps app state is',state)
    return {
        registerModalOpen:getRegisterModalStatusSelector(state)
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
    }
}
AppComponent.propTypes = {
    registerModalOpen:PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired
};
export const App = connect(mapStateToProps,mapDispatchToProps)(AppComponent)
export default App;