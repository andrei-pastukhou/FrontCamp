import React from 'react'
import {connect} from 'react-redux'
import {login, logout} from '../actions'


import {render} from "react-dom";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isLogin) {
            return (
            <div className="panel panel-default">
                <div className="panel-body">
                    You're already login as {this.props.username}
                    <input className="btn btn-success" type="submit" value="Logout" onClick={this.logout.bind(this)}/>
                </div>
            </div>);
        }

        if (this.props.pending) {
            return (
            <div className="panel panel-default">
                <div className="panel-body">
                    LOADING ........
                </div>
            </div>);
        }
        let Message = () => { return (<div></div>) };
        if (this.props.message) {
            Message = () => {
                return (
                    <div className="alert alert-danger" role="alert">{this.props.message}</div>
                );
            };
        }

        return (
        <div className="panel panel-default">
            <Message/>
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

    onSubmit(event) {
        event.preventDefault();
        this.props.dispatch(login(this.refs.login.value, this.refs.password.value));
        this.refs.password.value = '';
        this.refs.login.value = '';
    }

    logout(event){
        event.preventDefault();
        this.props.dispatch(logout());
    }
}

const mapStateToProps = (state) => {
    return {
        message : state.login.message,
        pending : state.login.pending,
        isLogin : state.login.isLogin,
        username: state.login.username
    };
};

LoginForm = connect(mapStateToProps)(LoginForm);

export default LoginForm
