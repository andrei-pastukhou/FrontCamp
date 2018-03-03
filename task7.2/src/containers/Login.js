import React from 'react'
import {connect} from 'react-redux'
import {login} from '../actions'

import {render} from "react-dom";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        if(this.props.pending){
            return (
            <div className="panel panel-default">
                <div className="panel-body">
                    LOADING ........
                </div>
            </div>);
        } else {
            return (
            <div className="panel panel-default">
                <h4>{this.props.message}</h4>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="AuthorInput">Login</label>
                            <input type="text" className="form-control" id="LoginInput" ref="login"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="PostInput">Password</label>
                            <input type="password" className="form-control" id="PasswordInput" ref="password"/>
                        </div>
                        <div className="form-group">
                            <input className="btn btn-success" type="submit" value="Login"/>
                        </div>
                    </form>
                </div>
            </div>);
        }
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.dispatch(login(this.refs.login.value, this.refs.password.value));
        this.refs.password.value = '';
        this.refs.login.value = '';
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        message : state.login.message,
        pending : state.login.pending,
    };
};

LoginForm = connect(mapStateToProps)(LoginForm);

export default LoginForm
