
import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import posts from './posts'
import login from './login'

const AppReducer = combineReducers({
    posts,
    visibilityFilter,
    login
});

export default AppReducer