import React from 'react'
import RegisterPage from './RegisterPage'
import RegisterForm from '../containers/Register'
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
global.shallow = shallow;
global.render = render;

describe('<RegisterPage/>', () => {
   it('test RegisterPage component', () => {
      const renderedComponent = shallow(<RegisterPage />
      );
      
      expect(renderedComponent.find('h1').length).toBe(1);
      expect(renderedComponent.find('h1').text()).toBe('RegisterPage');
      expect(renderedComponent.contains(<RegisterForm />)).toBe(true);
    });
});