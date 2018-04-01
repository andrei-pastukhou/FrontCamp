import React from 'react'
import LoginPage from './LoginPage'
import LoginForm from '../containers/Login'
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
global.shallow = shallow;
global.render = render;

describe('<LoginPage/>', () => {
   it('test LoginPage component', () => {
      const renderedComponent = shallow(<LoginPage />
      );
      
      expect(renderedComponent.find('h1').length).toBe(1);
      expect(renderedComponent.find('h1').text()).toBe('LoginPage');
      expect(renderedComponent.contains(<LoginForm />)).toBe(true);
    });
});