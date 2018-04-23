import React from "react";
import ListPost from '../containers/listPost'
import Filter from '../containers/Filter'
import { fetchPost } from '../actions';
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { config } from '../config'
import ListPage from './ListPage'
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
global.shallow = shallow;
global.render = render;

import configureStore from 'redux-mock-store'

describe('<ListPage/>', () => {
    it('test ListPage component', () => {
        const initialState = { login: { isLogin: false } };
        const mockStore = configureStore();
        let store, container, renderedComponent;


        store = mockStore(initialState);
        renderedComponent = shallow(<ListPage store={store} />).first().shallow();
        expect(renderedComponent.find('h1').length).toBe(1);
        expect(renderedComponent.find('h1').text()).toBe('ListPage');
        expect(renderedComponent.find('h4').length).toBe(1);
        expect(renderedComponent.find('Link').length).toBe(2);

        store = mockStore({ login: { isLogin: true } });
        renderedComponent = shallow(<ListPage store={store} />).first().shallow();
        expect(renderedComponent.find('h1').length).toBe(1);
        expect(renderedComponent.find('h1').text()).toBe('ListPage');
        expect(renderedComponent.find('Connect(FilterPostForm)').length).toBe(1);
        expect(renderedComponent.find('Connect(ListPost)').length).toBe(1);


    });
});
