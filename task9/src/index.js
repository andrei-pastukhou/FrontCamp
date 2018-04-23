import React from "react";
import {render} from "react-dom";
import PostApp from "./App";
import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import AppReducer from './reducers'

import thunkMiddleware from 'redux-thunk';


let store = createStore(AppReducer, compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
render((
<Provider store={store}>
    <BrowserRouter>
        <PostApp store={store}/>
    </BrowserRouter>
</Provider>
), document.getElementById('app'));
