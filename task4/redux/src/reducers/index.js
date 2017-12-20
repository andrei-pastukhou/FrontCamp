
import { combineReducers } from 'redux'
import channels from './channels'
import news from './news'

const rootReducer = combineReducers({
  channels, news
});

export default rootReducer