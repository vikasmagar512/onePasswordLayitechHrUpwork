import React from 'react';
import {Link, IndexLink } from 'react-router';

class InfoPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Info</h1>
        <p>Link to Github Repository</p>
        <a href="https://github.com/vikasmagar512/inteliment-Assignment">https://github.com/vikasmagar512/inteliment-Assignment</a>
      </div>
    );
  }
}

export default InfoPage;