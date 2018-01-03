import {config} from '../config.js'
import * as types from '../constants';

//Function to get news from remote server. Function call in link onClick event
export function fetchAllNewsFromServer() {
  return (dispatch, getState) => {
    let currentState = getState();
    let sources = [];
    currentState.channels.map((channel) => {
      if (channel.selected){
        sources.push(channel.source);
      }});
    const source = sources.join(',');
    if(source){
      dispatch({type: types.FETCH_NEWS});
      fetch(`${config.url}?sources=${source}&sortBy=publishedAt&apiKey=${config.apiKey}`)
        .then((response) => { return response.json();})
        .then(data => dispatch({type: types.FETCH_NEWS_SUCCESS, news: data.articles}))
        .catch(errors => dispatch({type: types.FETCH_NEWS_ERROR, errors: errors}))
    }
    else {
      dispatch({type: types.FETCH_NEWS_SUCCESS, news: []})
    }
  }
}

//Function call in link onClick event
export function clickLink(id, selected) {
  return {
    type: types.CLICK_LINK,
    id,
    selected
  }
}
