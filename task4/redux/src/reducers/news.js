import * as types from '../constants';

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_NEWS:
      return initialState;
    case types.FETCH_NEWS_SUCCESS:
      return action.news;
    default:
      return state
  }
}
