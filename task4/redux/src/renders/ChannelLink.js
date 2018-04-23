import {config} from '../config';
import * as actions from '../actions'

// Function to visualization links.
function render(store) {
  let channels = store.getState().channels;
  document.getElementById(config.domId.channelList).innerHTML = "";
  channels.forEach((channel,index)=> {
    let onClickFunction = (e) => {
      e.preventDefault();
      store.dispatch(actions.clickLink(index,!channel.selected));
      store.dispatch(actions.fetchAllNewsFromServer());
    };
    let domElement = document.createElement('a');
    domElement.appendChild(document.createTextNode(channel.title));
    domElement.href = '#';
    domElement.className = 'flex-sm-fill text-sm-center nav-link';
    domElement.setAttribute('source', channel.source);
    domElement.addEventListener('click', (e) => {
      onClickFunction(e);
    });
    if(channel.selected) {
      domElement.classList.add('active');
    } else {
      domElement.classList.remove('active');
    }
    document.getElementById(config.domId.channelList).appendChild(domElement)
  });
}

export {render};
