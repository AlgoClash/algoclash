import React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import components here
import FrontendFunction from '../client/FrontendFunction.tsx';

configure({ adapter: new Adapter() });
// component-level testing suite
describe('FrontendFunction tests', () => {
  // optional: group individual tests into logical testing suites
  describe('FrontendFunction should render without props', () => {
    it('should return a div wrapper of class .testComponent', () => {
      // shallow render imported component
      const container = shallow(<FrontendFunction />);
      // select element by tag, check attribute value, test assertion
      expect(container.find('div').hasClass('testComponent')).toEqual(true);
    });

    it('should return a <p> element with value of "Loading data..."', () => {
      const container = shallow(<FrontendFunction />);
      expect(container.find('p').text()).toEqual('Loading data...');
    });
  });

  describe('FrontendFunction should render with passed-in props', () => {
    // declare test props
    const testProps = 'hi';
    it('should return a div wrapper of class .testComponent', () => {
      // pass test props into shallow render
      const container = shallow(<FrontendFunction displayText={testProps} />);
      expect(container.find('div').hasClass('testComponent')).toEqual(true);
    });

    it('should return a list of <p> elements with value of passed-in prop & length of 5', () => {
      const container = shallow(<FrontendFunction displayText={testProps} />);
      expect(container.find('p').length).toEqual(5);
      // search for list of elements, get inner text of 0th element, test assertion
      expect(container.find('p').at(0).text()).toEqual(testProps);
    });
  });
});
