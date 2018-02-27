import React from "react";
import {render} from "react-dom";
import {mock} from "./mock/mock"


import FilterPostForm from "./components/FilterPostForm"
import Header from './components/Header'
import AddPostPage from './components/AddPostPage'
import IndexPage from './components/IndexPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import ListPage from './components/ListPage'


import { Switch, Route } from 'react-router-dom'


export default class PostApp extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
              <Header />
              <Switch>
                <Route exact path='/' component={IndexPage} />
                <Route path='/register' component={RegisterPage} />
                <Route path='/login' component={LoginPage} />
                <Route path='/list' component={ListPage} />
                <Route path='/addPost' component={AddPostPage} />
              </Switch>
                {/*<FilterPostForm filterText={this.state.filterText}  onFilterTextChange={this.handleFilterTextChange.bind(this)} />*/}
                {/*<AddPostForm addEvent={this.addPost.bind(this)} state={this.state} />*/}
            </div>
        );
    }

    addPost(Post) {
        let newItemsState = this.state.items;
        newItemsState.unshift(Post.newItem);
        this.setState({items: newItemsState});
        this.render();
    }

    deletePost(key) {
        let newItemsState = this.state.items;
        newItemsState.splice(key.index, 1);
        this.setState({items: newItemsState});
    }

    handleFilterTextChange(filterText) {
        this.setState({filterText: filterText});
    }
}

