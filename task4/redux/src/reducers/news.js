import * as actions from '../actions'

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_NEWS:
      return initialState;
    case actions.FETCH_NEWS_SUCCESS:
      return action.news;
    default:
      return state
  }
}
