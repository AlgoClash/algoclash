import React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Modal from '../client/Modal.tsx';

configure({ adapter: new Adapter() });
describe('Modal tests', () => {
  describe('Modal should render without props', () => {

    it('should render 3 divs', () => {
      const container = shallow(<Modal />);
      expect(container.find('div').length).toEqual(3);
    });

  });

  describe('Modal should render with passed-in props', () => {

    const testHeader = 'testheader';

    it('should render passed in content', () => {
      const container = shallow(<Modal contents={<div className="testdiv">{'testdiv'}</div>} />);
      expect(container.find('div.testdiv').text()).toEqual('testdiv');
    });

    it('should return a header displaying the passed in title', () => {
      const container = shallow(<Modal title={testHeader} />);
      expect(container.find('div').at(1).hasClass('header')).toEqual(true);
      expect(container.find('div').at(1).text()).toContain(testHeader);
    });

  });
});
