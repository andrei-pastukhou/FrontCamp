import React from 'react'
import { connect } from 'react-redux'

import {render} from "react-dom";
import PostItem from '../components/PostItem'



class ListPost extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
         let items = this.props.posts.map((item,index) => {
             return (
             <li key={index} className="list-group-item" >
                 <PostItem item={item} />
             </li>
             );
        });
        return (
            <ul className="list-group"> {items} </ul>);
    }
    // <button className="btn btn-danger btn-sm" onClick = {(e) => this.deletePost({index})}>delete</button>
}
const mapStateToProps = (state) => {
    return {
        posts : state.posts,
    };
}

ListPost = connect(mapStateToProps)(ListPost);

export default ListPost
