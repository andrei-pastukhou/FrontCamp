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
        this.props.dispatch(addPostToServer(this.refs.post.value, this.props.username, this.props.token));
        this.refs.post.value = '';
    }
}

const mapStateToProps = (state) => ({
   token: state.login.token,
   username: state.login.username
});

AddPostForm = connect(mapStateToProps)(AddPostForm);

export default AddPostForm
