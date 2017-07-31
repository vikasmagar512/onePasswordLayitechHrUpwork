import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from '../../src/components/LogInPage';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

describe('LoginPage', () => {
   /* it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LoginPage/>, div);
    });*/
    it('should match its empty snapshot', () => {
		const tree = renderer.create(
		  <LoginPage/>
		 ).toJSON();
		expect(tree).toMatchSnapshot();
	});
});	