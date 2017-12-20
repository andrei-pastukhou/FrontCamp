import {config} from '../constants/Config'
export const CLICK_LINK = 'CLICK_LINK';

export function clickLink(id, selected) {
  return {
      type: CLICK_LINK,
      id,
      selected
  }
};


export const FETCH_NEWS = 'FETCH_NEWS';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_ERROR = 'FETCH_NEWS_ERROR';

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
      dispatch({type: FETCH_NEWS});
      const req = new Request(`${config.url}?sources=${source}&sortBy=publishedAt&apiKey=${config.apiKey}`);
      fetch(req)
        .then((response) => { return response.json();})
        .then(data => dispatch({type: FETCH_NEWS_SUCCESS, news: data.articles}))
        .catch(errors => dispatch({type: FETCH_NEWS_ERROR, errors: errors}))
    }
    else {
      dispatch({type: FETCH_NEWS_SUCCESS, news: []})
    }
  }
}

