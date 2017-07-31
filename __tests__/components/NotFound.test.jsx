import {Link,IndexLink} from 'react-router';
import React,{Component} from 'react';
import createReactClass from  'create-react-class';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import NotFound from '../../src/components/NotFound';


describe('NotFound', () => {
  it('should match its empty snapshot', () => {
    const tree = renderer.create(
      <NotFound/>
     ).toJSON();
    expect(tree).toMatchSnapshot();
  });
/*    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
    });
*/   
}); 