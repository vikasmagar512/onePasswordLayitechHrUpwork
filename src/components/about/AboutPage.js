
import React,{Component} from 'react';
import createReactClass from  'create-react-class';


import PropTypes from 'prop-types'
import { Link, IndexLink } from 'react-router';

class AboutPage extends Component{
  render() {
    return (
      <div>
        <p>Explore below section to know more about your team and also let other's know about you.</p>
          <ul className="nav nav-tabs" style={{marginBottom:'30px'}}>
            <li><Link to="/about/profile" className="active"> Profile  </Link></li>
            <li><Link to="/about/team" > Team</Link></li>
            <li><Link to="/about/contact" > Contact</Link></li>
          </ul>
        {this.props.children}
      </div>
    );
  }
}
export default AboutPage;
