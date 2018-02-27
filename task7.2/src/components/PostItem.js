import React from "react";
import PropTypes from 'prop-types'

export default class PostItem extends React.Component {
    render() {
        return (
        <div>
            <h3>{this.props.item.author}</h3>
            <pre>{this.props.item.post}</pre>
        </div>
        );
    }
}
