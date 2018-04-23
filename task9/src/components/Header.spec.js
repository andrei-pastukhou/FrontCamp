import React from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
global.shallow = shallow;
global.render = render;

describe('<Header/>', () => {
   it('test Header component', () => {
      const renderedComponent = shallow(<Header />
      );

      expect(renderedComponent.find('nav').length).toBe(1);
      expect(renderedComponent.find('ul').length).toBe(1);
      expect(renderedComponent.find('li').length).toBe(4);
      expect(renderedComponent.find('Link').length).toBe(4);
    });
});