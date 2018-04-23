import "./css/bootstrap.min.css";

import {createStore} from  './handMadeRedux'

import rootReducer from './reducers'
import * as newsRender from './renders/NewsList';
import * as linkRender from './renders/ChannelLink';
import * as actions from './actions';




let store = createStore(rootReducer);

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
