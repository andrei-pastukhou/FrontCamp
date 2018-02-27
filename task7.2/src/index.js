import React from "react";
import { render } from "react-dom";
import PostApp from "./App";
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import AppReducer from './reducers'

let store = createStore(AppReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
render((
  <Provider store={store}>
    <BrowserRouter>
      <PostApp />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));
