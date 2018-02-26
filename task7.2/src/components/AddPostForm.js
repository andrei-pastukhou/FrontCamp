import React from "react";
import ReactDOM from "react-dom";
import {render} from "react-dom";

export default class AddPostForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
        <div className="panel panel-default">
            <div className="panel-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="AuthorInput">Author</label>
                        <input type="text" className="form-control" id="AuthorInput" ref="author"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="PostInput">Post</label>
                        <textarea className="form-control" id="PostInput" ref="post" />
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

        const postInput = ReactDOM.findDOMNode(PostInput);
        const authorInput = ReactDOM.findDOMNode(AuthorInput);
        const newItem = {author:authorInput.value, post:postInput.value};

        this.props.addEvent({ newItem });

        postInput.value = '';
        authorInput.value = '';
    }
}
