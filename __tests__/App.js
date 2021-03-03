import React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../client/App.tsx';

configure({ adapter: new Adapter() });
describe('App tests', () => {

  describe('App should render without props', () => {

    it('should render 9 divs', () => {
      const container = shallow(<App />);
      expect(container.find('div').length).toEqual(9);
    });

    it('should render the app container', () => {
      const container = shallow(<App />);
      expect(container.find('#appcontainer')).toHaveLength(1);
    });

    it('should render all containers', () => {
      const container = shallow(<App />);
      expect(container.find('#questioncontainer')).toHaveLength(1);
      expect(container.find('#editorcontainer')).toHaveLength(1);
      expect(container.find('#testcontainer')).toHaveLength(1);
      expect(container.find('#consolecontainer')).toHaveLength(1);
      expect(container.find('#optionscontainer')).toHaveLength(1);
    });

  });

});
