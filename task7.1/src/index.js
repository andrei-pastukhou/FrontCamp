import React from "react";
import ReactDOM from "react-dom";
import {render} from "react-dom";


var allItems = [
    {
        author: 'author1',
        post: 'some post text from author1'
    },
    {
        author: 'author2',
        post: 'some post text from author2'
    },
    {
        author: 'author2',
        post: 'some post text from author2 copy'
    },
    {
        author: 'author3',
        post: 'some post text from author3'
    },
];


class PostApp extends React.Component {
    constructor(props){
        super(props);

        this.addPost = this.addPost.bind(this);
        this.FilterPost = this.FilterPost.bind(this);
        this.deletePost = this.deletePost.bind(this);

        this.state = {
            filterText: '',
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    // getInitialState() {
    //     return { allItems };
    // }
    render() {
        console.log(this.props.items);
        let items = this.props.items.map((item,index) => {
            if (item.author.indexOf(this.state.filterText) === -1) {
                return;
            }
            return <li key={index} className="list-group-item" ><PostItem item={item} /><button className="btn btn-danger btn-sm" onClick = {(e) => this.deletePost({index})}>delete</button></li>;
        });
        return(
        <div>
            <FilterPostForm filterText={this.state.filterText}  onFilterTextChange={this.handleFilterTextChange}/>
            <AddPostForm addEvent={this.addPost} />
            <ul className="list-group">{items}</ul>
        </div>
        );
    }

    addPost  (Post) {
        allItems.unshift(Post.newItem);
        this.setState({ allItems });
    }

    FilterPost (Author) {
        allItems.unshift(Author.newItem2);
        this.setState({ allItems });
    }
    deletePost (key) {
        allItems.splice(key.index,1);
        this.setState({ allItems });
    }
}

class PostItem extends React.Component {
    render(){
        return (
            <div>
                <h3>{this.props.item.author}</h3>
                <pre>{this.props.item.post}</pre>
            </div>
        );
    }
}

class AddPostForm extends React.Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        ReactDOM.findDOMNode(this.refs.author).focus();
    }
    render(){
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
                        <textarea className="form-control" id="PostInput" ref="post"></textarea>
                    </div>
                    <div className="form-group">
                        <input className="btn btn-success" type="submit" value="Add post"/>
                    </div>
                </form>
            </div>
        </div>);
    }
    onSubmit(event){
        event.preventDefault();
        let postInput = ReactDOM.findDOMNode(this.refs.post);
        let authorInput = ReactDOM.findDOMNode(this.refs.author);
        let newItem = {author:authorInput.value, post:postInput.value};
        this.props.addEvent({ newItem });
        postInput.value = '';
        authorInput.value = '';
    }
}

class FilterPostForm extends React.Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input type="text"  className="form-control" placeholder="Search..." value={this.props.filterText} onChange={this.handleFilterTextChange}/>
                </div>
            </form>
        );
    }

    onSubmit(event){
        event.preventDefault();
    }
}



render(<PostApp items={allItems} />, document.getElementById('app'));
