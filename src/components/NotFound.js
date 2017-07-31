import React from 'react';
import {Link} from 'react-router';

const NotFound = () =>
  <div className="container">
      <p>Seems like you took the wrong way.</p>
      <Link to="/">Go to Homepage </Link>
  </div> ;

export default NotFound;