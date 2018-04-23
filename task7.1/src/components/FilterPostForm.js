import React from "react";

export default class FilterPostForm extends React.Component {
    constructor(props) {
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
                <input type="text" className="form-control" placeholder="Search..." value={this.props.filterText}
                       onChange={this.handleFilterTextChange}/>
            </div>
        </form>
        );
    }

    onSubmit(event) {
        event.preventDefault();
    }
}
