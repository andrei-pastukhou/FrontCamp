import React from 'react'
import { connect } from 'react-redux'

import {render} from "react-dom";
import PostItem from '../components/PostItem'
import {deletePosts} from '../actions'
import {fetchPosts} from '../actions'

class ListPost extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(fetchPosts(this.props.token));
    }


    deletePost(id) {
        this.props.dispatch(deletePosts(id,this.props.token));//todo promise
        this.props.dispatch(fetchPosts(this.props.token));
    }

    render() {
        let items = this.props.posts.map((item, index) => {
            if (this.props.visibilityFilter === '' || item.author.match(this.props.visibilityFilter)) {
                return (
                <li key={item._id} className="list-group-item">
                    <PostItem item={item}/>
                    <button className="btn btn-danger btn-sm" onClick={(e) => this.deletePost(item._id)}>delete</button>
                </li>
                );
            }
        });

        return (
            <ul className="list-group"> {items} </ul>);
    }

}
const mapStateToProps = (state) => {
    return {
        posts : state.posts,
        visibilityFilter: state.visibilityFilter,
        islogin : state.login.isLogin,
        token: state.login.token,
    };
}

ListPost = connect(mapStateToProps)(ListPost);

export default ListPost
