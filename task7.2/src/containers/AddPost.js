import React from 'react'
import {connect} from 'react-redux'
import {addPost} from '../actions'

import {render} from "react-dom";

class AddPostForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="panel panel-default">
            <div className="panel-body">
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="AuthorInput">Author</label>
                        <input type="text" className="form-control" id="AuthorInput" ref="author"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="PostInput">Post</label>
                        <textarea className="form-control" id="PostInput" ref="post"/>
                    </div>
                    <div className="form-group">
                        <input className="btn btn-success" type="submit" value="Add post"/>
                    </div>
                </form>
            </div>
        </div>);
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.dispatch(addPost(this.refs.post.value, this.refs.author.value));
        this.refs.post.value = '';
        this.refs.author.value = '';
    }
}

AddPostForm = connect()(AddPostForm);

export default AddPostForm
