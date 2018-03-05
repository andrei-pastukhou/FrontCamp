import {combineReducers} from 'redux'
import visibilityFilter from './visibilityFilter'
import posts from './posts'
import login from './login'
import register from './register'

const AppReducer = combineReducers({
    posts,
    visibilityFilter,
    login,
    register
});

export default AppReducer
