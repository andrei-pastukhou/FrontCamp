import React from "react";

export default class FilterPostForm extends React.Component {
    constructor(props) {
        super(props);
    }

     handleFilterTextChange(e) {
         this.props.FilterPost(e.target.value);
     }

    render() {
        return (
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Search..." ref="author" defaultValue={this.props.visibilityFilter}
                       onChange={this.handleFilterTextChange.bind(this)}/>
            </div>
        );
    }
}
