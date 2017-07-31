import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import App from '../../src/components/App';


describe('App', () => {
 	it('should match its empty snapshot', () => {
		const tree = renderer.create(
		  <App/>
		 ).toJSON();
		expect(tree).toMatchSnapshot();
	});
/*    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
    });
*/   
});	