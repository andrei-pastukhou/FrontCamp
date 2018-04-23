import React from "react";
import {render} from "react-dom";

import Header from './components/Header'
import AddPostPage from './components/AddPostPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import ListPage from './components/ListPage'

import { Switch, Route } from 'react-router-dom'

export default class PostApp extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
        <div>
            <Header/>
            <Switch>
                <Route exact path='/' component={ListPage} />
                <Route path='/register' component={RegisterPage} />
                <Route path='/login' component={LoginPage} />
                <Route path='/addPost' component={AddPostPage} />
            </Switch>
        </div>
        );
    }
}
