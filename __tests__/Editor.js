import React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Editor from '../client/Editor.tsx';
import CodeMirror from '@skidding/react-codemirror';

configure({ adapter: new Adapter() });
describe('Editor tests', () => {
  describe('Editor should render without props', () => {

    it('should return a div wrapper of class .ide', () => {
      const container = shallow(<Editor />);
      expect(container.find('div').at(0).hasClass('ide')).toEqual(true);
    });

    it('should render 3 divs', () => {
      const container = shallow(<Editor />);
      expect(container.find('div').length).toEqual(3);
    });

    it('should container CodeMirror editor', () => {
      const container = shallow(<Editor />);
      expect(container.find(CodeMirror)).toHaveLength(1);
    });

  });

  describe('Editor should render with passed-in props', () => {

    const testUser = 'testuser';

    it('should return a div wrapper of class .ide', () => {
      const container = shallow(<Editor username={testUser} />);
      expect(container.find('div').at(0).hasClass('ide')).toEqual(true);
    });

    it('should return a header displaying the passed in username', () => {
      const container = shallow(<Editor username={testUser} />);
      expect(container.find('div').at(1).hasClass('header')).toEqual(true);
      expect(container.find('div').at(1).text()).toContain(testUser);
    });

  });

  describe('Editor should change functionality based on state', () => {

    it('class should reflect user', () => {

      const containerPlayer = shallow(<Editor user={''} collapsed={false} />);
      expect(containerPlayer.find('div').at(2).hasClass('player')).toEqual(true);

      const containerChallenger = shallow(<Editor user={'challenger'} collapsed={false} />);
      expect(containerChallenger.find('div').at(2).hasClass('challenger')).toEqual(true);
    });

  });

});
