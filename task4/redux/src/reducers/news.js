import {FETCH_NEWS, FETCH_NEWS_SUCCESS} from '../constants';

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS:
      return initialState;
    case FETCH_NEWS_SUCCESS:
      return action.news;
    default:
      return state
  }
}
