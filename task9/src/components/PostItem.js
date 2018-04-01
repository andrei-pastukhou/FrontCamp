import React from "react";

export default class PostItem extends React.Component {
    render() {
        return (
        <div>
            <h3>{this.props.item.author}</h3>
            <pre>{this.props.item.text}</pre>
        </div>
        );
    }
}
