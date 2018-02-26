import React from "react";
import {render} from "react-dom";
import PostApp from "./App";
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux'
import { createStore } from 'redux'

// let store = createStore(here should be reducer);
let store = {};
render((
  <Provider store={store}>
    <BrowserRouter>
      <PostApp />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));
