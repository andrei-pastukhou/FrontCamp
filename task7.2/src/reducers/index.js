
import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import posts from './posts'

const AppReducer = combineReducers({
    posts,
    todos,
    visibilityFilter
});

export default AppReducer