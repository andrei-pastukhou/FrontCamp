import React from 'react'
import PostItem from './PostItem'
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
global.shallow = shallow;
global.render = render;

describe('<PostItem/>', () => {
   it('test PostItem component', () => {
      const renderedComponent = shallow(<PostItem item = {{author:"user", text:"test text"}}/> );
      expect(renderedComponent.find('h3').length).toBe(1);
      expect(renderedComponent.find('pre').length).toBe(1);
      expect(renderedComponent.find('h3').text()).toBe("user");
      expect(renderedComponent.find('pre').text()).toBe("test text");
    });
});