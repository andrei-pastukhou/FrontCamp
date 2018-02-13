import React from "react";
import ReactDOM from "react-dom";
import {render} from "react-dom";
var allItems = []
allItems.push("Buy ingredients for Crock Pot");
allItems.push("Pick up chair at IKEA");
allItems.push("Go see mom");


class PostApp extends React.Component {
    constructor(props){
        super(props);

        this.addPost = this.addPost.bind(this);
        this.FilterPost = this.FilterPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }
    // getInitialState() {
    //     return { allItems };
    // }
    render() {
        let items = this.props.items.map((item,index) => {
            return <li key={index} ><PostItem item={item} /><button onClick = {(e) => this.deletePost({index})}>delete</button></li>;
        });
        return(
        <div>
            <AddPostForm addEvent={this.addPost} />
            <FilterPostForm addEvent={this.FilterPost} />
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
        return <div>{this.props.item}</div>;
    }
}

class AddPostForm extends React.Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        ReactDOM.findDOMNode(this.refs.itemName).focus();
    }
    render(){
        return (<form onSubmit={this.onSubmit}>
            <input ref="itemName" type="text" />
        </form>);
    }
    onSubmit(event){
        event.preventDefault();
        let input = ReactDOM.findDOMNode(this.refs.itemName);
        let newItem = input.value;
        this.props.addEvent({ newItem });
        input.value = '';
    }
}

class FilterPostForm extends React.Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        ReactDOM.findDOMNode(this.refs.itemName2).focus();
    }
    render(){
        return (<form onSubmit={this.onSubmit}>
            <input ref="itemName2" type="text" />
        </form>);
    }
    onSubmit(event){
        event.preventDefault();
        let input = ReactDOM.findDOMNode(this.refs.itemName2);
        let newItem2 = input.value;
        this.props.addEvent({ newItem2 });
        input.value = '';
    }
}



render(<PostApp items={allItems} />, document.getElementById('app'));
