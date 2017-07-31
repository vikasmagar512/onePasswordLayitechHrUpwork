
import React,{Component} from 'react';
import createReactClass from 'create-react-class';

import PropTypes from 'prop-types'
import Header from './common/Header';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <div className="jumbotron">
          {this.props.children}
        </div>
      </div>
    );
  }
}

/*App.propTypes = {
  children: PropTypes.object.isRequired
};*/
export default App;