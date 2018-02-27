
import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import posts from './posts'

const AppReducer = combineReducers({
    posts,
    visibilityFilter
});

export default AppReducer