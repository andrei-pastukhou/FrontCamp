import "./css/bootstrap.min.css";

import {createStore,  applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducer from './reducers'

import * as actions from './actions'

import * as newsRender from './renders/NewsList';
import * as linkRender from './renders/ChannelLink';


let store = createStore(reducer, applyMiddleware(thunk))

//Function will call every time when store change. Use for visualization store state.
function render() {

  linkRender.render( store );


  newsRender.render( store );
}

//First visualization store (in that moment store have initial state which define in reducers)
render();
store.subscribe(render);

// Try get news from server. It necessary for download news if selected is true in any channel from initial state.
store.dispatch(actions.fetchAllNewsFromServer());
