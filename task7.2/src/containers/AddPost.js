import React from 'react'
import {connect} from 'react-redux'
import {addPostToServer} from '../actions'

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
        this.props.dispatch(addPostToServer(this.refs.post.value, this.refs.author.value, this.props.token));
        this.refs.post.value = '';
        this.refs.author.value = '';
    }
}
const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  };
}
AddPostForm = connect(mapStateToProps)(AddPostForm);

export default AddPostForm
