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
            return <li key={index} ><PostItem item={item} /><button onClick = {(e) => this.deletePost({index})}>delete</button></li>;
        });
        return(
        <div>
            <AddPostForm addEvent={this.addPost} />
            <FilterPostForm filterText={this.state.filterText}  onFilterTextChange={this.handleFilterTextChange}/>
            <ul>{items}</ul>
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
        return (<div>
                    <b>author:</b>{this.props.item.author}<br />
                    <b>post:</b>{this.props.item.post}<br />
                </div>);
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
        return (<form onSubmit={this.onSubmit}>
            <b>author</b><input ref="author" type="text" />
            <b>post</b><input ref="post" type="text" />
            <input type="submit" />
        </form>);
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

    render(){
        return (<form onSubmit={this.onSubmit}>
            <input
            type="text"
            placeholder="Search..."
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
            />
        </form>);
    }
    onSubmit(event){
        event.preventDefault();
    }
}



render(<PostApp items={allItems} />, document.getElementById('app'));
