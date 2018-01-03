import * as types from '../constants';

let initialState = [
  {
    title: 'ABC News',
    source: 'abc-news',
    selected : false
  },
  {

    title: 'Aftenposten',
    source: 'aftenposten',
    selected : false
  },
  {
    title: 'BBC News',
    source: 'bbc-news',
    selected : false
  },
  {
    title: 'CNN',
    source: 'cnn',
    selected : false
  },
  {
    title: 'Daily Mail',
    source: 'daily-mail',
    selected : false
  }
];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CLICK_LINK:
      let newState = state;
      newState.map((channel,index) => {
        if (index === action.id){
          channel.selected = action.selected;
        }});
      return (Object.assign([], state,
        newState));
    default:
      return state
  }
}
