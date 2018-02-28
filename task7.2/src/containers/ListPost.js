import React from 'react'
import { connect } from 'react-redux'

import {render} from "react-dom";
import PostItem from '../components/PostItem'
import {deletePost} from '../actions'


class ListPost extends React.Component {
    constructor(props) {
        super(props);
    }


    deletePost(id) {
        this.props.dispatch(deletePost(id));
    }

    render() {
        let items = this.props.posts.map((item, index) => {
            if (this.props.visibilityFilter === '' || item.author.match(this.props.visibilityFilter)) {
                return (
                <li key={item.id} className="list-group-item">
                    <PostItem item={item}/>
                    <button className="btn btn-danger btn-sm" onClick={(e) => this.deletePost(item.id)}>delete</button>
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
        visibilityFilter: state.visibilityFilter
    };
}

ListPost = connect(mapStateToProps)(ListPost);

export default ListPost
